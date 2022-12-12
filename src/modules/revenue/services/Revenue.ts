import { v4 as generateUUIDV4 } from "uuid";

import { BusinessException, NotFoundException } from "../../api/exception";
import { UserService } from "../../user/services";
import {
  RevenueRepositoryDto,
  CreateRevenueServiceInputDto,
  UpdateRevenueServiceInputDto,
  UpdateRevenueRepositoryInputDto,
  RevenueServiceOutputDto,
  ExpenseCategoryPercentageServiceOutputDto
} from "../dto";
import { Month, MonthDescription, MonthKey, MonthKeys } from "../enums";
import { RevenueRepository } from "../respository";
import {
  FindByMonthAndYearAndNotIdRepository,
  FindByMonthAndYearAndUserIdController,
  FindByMonthAndYearAndUserIdRepository,
  FindByMonthAndYearAndUserIdService
} from "../types";
import { RevenueValidationSchema } from "../validation";
import { ExpenseCategoryPercentageService } from "./ExpenseCategoryPercentage";

export class RevenueService {
  private userService: UserService;
  private expenseCategoryPercentageService: ExpenseCategoryPercentageService;

  private revenueRepository: RevenueRepository;

  constructor() {
    this.userService = new UserService();
    this.expenseCategoryPercentageService =
      new ExpenseCategoryPercentageService();

    this.revenueRepository = new RevenueRepository();
  }

  async create(revenueData: CreateRevenueServiceInputDto) {
    await this.validateRevenueDataAndThrowExceptionIfDataIsInvalid(revenueData);
    await this.expenseCategoryPercentageService.verifyAllCategoriesAndThrowExceptionIfCategoriesOrPercentagesAreInvalid(
      revenueData.expenseCategoryPercentages
    );

    await this.userService.verifyUserExistenceAndThrowExceptionIfDoesntExists(
      revenueData.userId
    );

    await this.verifyRevenueExistenceByMonthAndYearAndThrowExceptionIfExists(
      revenueData.month,
      revenueData.year,
      revenueData.userId
    );

    const revenueId = generateUUIDV4();

    const revenueRepositoryData =
      this.convertCreateRevenueServiceInputDtoToRevenueRepositoryDto(
        revenueId,
        revenueData
      );

    await this.revenueRepository.create(revenueRepositoryData);
    await this.expenseCategoryPercentageService.create(
      revenueId,
      revenueData.expenseCategoryPercentages
    );
  }

  async verifyRevenueExistenceByMonthAndYearAndThrowExceptionIfExists(
    month: MonthKey,
    year: number,
    userId: string
  ) {
    const monthNumericValue = Month[month];
    const existingRevenue = await this.revenueRepository.findByMonthAndYear(
      monthNumericValue,
      year,
      userId
    );

    if (existingRevenue) {
      const monthName = MonthDescription[month];
      const message = `Já existe uma receita cadastrada para ${monthName} de ${year}`;

      throw new BusinessException(message);
    }
  }

  async update(updatedData: UpdateRevenueServiceInputDto) {
    await this.validateRevenueDataAndThrowExceptionIfDataIsInvalid(updatedData);
    await this.expenseCategoryPercentageService.verifyAllCategoriesAndThrowExceptionIfCategoriesOrPercentagesAreInvalid(
      updatedData.expenseCategoryPercentages
    );

    const existingRevenue = await this.findRevenueByIdOrThrowException(
      updatedData.id
    );

    await this.userService.verifyUserExistenceAndThrowExceptionIfDoesntExists(
      updatedData.userId
    );
    await this.verifyRevenueExistenceByMonthAndYearAndNotIdAndThrowExceptionIfExists(
      updatedData.id,
      updatedData.month,
      updatedData.year
    );

    const numericMonthValue = Month[updatedData.month];
    const revenueRepositoryData: UpdateRevenueRepositoryInputDto = {
      id: existingRevenue.id,
      month: numericMonthValue,
      year: existingRevenue.year,
      amount: updatedData.amount
    };

    await this.revenueRepository.update(revenueRepositoryData);
    await this.expenseCategoryPercentageService.removeAllByRevenueId(
      revenueRepositoryData.id
    );
    await this.expenseCategoryPercentageService.create(
      revenueRepositoryData.id,
      updatedData.expenseCategoryPercentages
    );
  }

  private async validateRevenueDataAndThrowExceptionIfDataIsInvalid(
    revenueData: CreateRevenueServiceInputDto
  ) {
    await RevenueValidationSchema.validate(revenueData, {
      abortEarly: false
    });
  }

  private convertCreateRevenueServiceInputDtoToRevenueRepositoryDto(
    revenueId: string,
    revenueData: CreateRevenueServiceInputDto
  ) {
    const revenueRepositoryData: RevenueRepositoryDto = {
      id: revenueId,
      month: Month[revenueData.month],
      year: revenueData.year,
      amount: revenueData.amount,
      used_amount: 0,
      user_id: revenueData.userId
    };

    return revenueRepositoryData;
  }

  async verifyRevenueExistenceByMonthAndYearAndNotIdAndThrowExceptionIfExists(
    id: string,
    month: MonthKey,
    year: number
  ) {
    const monthNumericValue = Month[month];
    const params: FindByMonthAndYearAndNotIdRepository = {
      id,
      month: monthNumericValue,
      year
    };

    const existingRevenue =
      await this.revenueRepository.findByMonthAndYearAndNotId(params);

    if (existingRevenue) {
      const monthName = MonthDescription[month];
      const message = `Já existe uma receita para ${monthName} de ${year}`;

      throw new BusinessException(message);
    }
  }

  async findByUserIdAndMonthAndYear(
    params: FindByMonthAndYearAndUserIdController
  ) {
    await this.userService.verifyUserExistenceAndThrowExceptionIfDoesntExists(
      params.userId
    );

    const repositoryParams = this.getFindByUserIdAndMonthAndYearParams(params);

    const repositoryRevenue =
      await this.findRevenueByUserIdAndMonthAndYearOrThrowException(
        repositoryParams
      );

    const revenueExpenseCategoryPercentages =
      await this.expenseCategoryPercentageService.findByRevenueId(
        repositoryRevenue.id
      );

    const revenue = this.convertRevenueRepositoryDtoToRevenueServiceOutputDto(
      repositoryRevenue,
      revenueExpenseCategoryPercentages
    );

    return revenue;
  }

  private getFindByUserIdAndMonthAndYearParams(
    params: FindByMonthAndYearAndUserIdController
  ) {
    const currentDate = new Date();
    let month = (params.month as MonthKey) || MonthKeys[currentDate.getMonth()];
    let year = Number(params.year) || currentDate.getFullYear();

    const repositoryParams: FindByMonthAndYearAndUserIdService = {
      month,
      year,
      userId: params.userId
    };

    return repositoryParams;
  }

  private convertRevenueRepositoryDtoToRevenueServiceOutputDto(
    revenue: RevenueRepositoryDto,
    revenueExpenseCategoryPercentages: ExpenseCategoryPercentageServiceOutputDto[]
  ): RevenueServiceOutputDto {
    const monthKeyIndex = revenue.month - 1;
    const monthEnumKey = MonthKeys[monthKeyIndex] as MonthKey;

    return {
      id: revenue.id,
      month: monthEnumKey,
      year: revenue.year,
      amount: Number(revenue.amount),
      usedAmount: Number(revenue.used_amount),
      categoryPercentages: revenueExpenseCategoryPercentages
    };
  }

  async remove(id: string) {
    await this.findRevenueByIdOrThrowException(id);
    await this.revenueRepository.delete(id);
  }

  async findRevenueByIdOrThrowException(id: string) {
    const existingRevenue = await this.revenueRepository.findById(id);

    if (!existingRevenue) {
      throw new NotFoundException(`Não existe uma receita com o ID: ${id}`);
    }

    return existingRevenue;
  }

  async findRevenueByUserIdAndMonthAndYearOrThrowException(
    params: FindByMonthAndYearAndUserIdService
  ) {
    const monthNumericValue = Month[params.month];

    const repositoryQueryParams: FindByMonthAndYearAndUserIdRepository = {
      month: monthNumericValue,
      year: params.year,
      userId: params.userId
    };

    const revenue = await this.revenueRepository.findByUserIdAndMonthAndYear(
      repositoryQueryParams
    );

    if (!revenue) {
      const monthDescription = MonthDescription[params.month];
      throw new NotFoundException(
        `Não existe uma receita para ${monthDescription} de ${params.year}`
      );
    }

    return revenue;
  }
}
