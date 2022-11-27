import { v4 as generateUUIDV4 } from "uuid";

import { BusinessException, NotFoundException } from "../../api/exception";
import { UserService } from "../../user/services";
import {
  RevenueRepositoryDto,
  CreateRevenueServiceInputDto,
  UpdateRevenueServiceInputDto,
  UpdateRevenueRepositoryInputDto,
  RevenueServiceOutputDto
} from "../dto";
import { Month, MonthDescription, MonthKey, MonthKeys } from "../enums";
import { RevenueRepository } from "../respository";
import { FindByMonthAndYearAndNotId } from "../types";
import { RevenueValidationSchema } from "../validation";

export class RevenueService {
  private userService: UserService;
  private revenueRepository: RevenueRepository;

  constructor() {
    this.userService = new UserService();
    this.revenueRepository = new RevenueRepository();
  }

  async create(revenueData: CreateRevenueServiceInputDto) {
    await this.validateRevenueData(revenueData);
    await this.userService.verifyUserExistence(revenueData.userId);

    await this.verifyRevenueExistenceByMonthAndYear(
      revenueData.month,
      revenueData.year
    );

    const revenueId = generateUUIDV4();

    const revenueRepositoryData =
      this.convertCreateRevenueServiceInputDtoToRevenueRepositoryDto(
        revenueId,
        revenueData
      );
    await this.revenueRepository.create(revenueRepositoryData);
  }

  async verifyRevenueExistenceByMonthAndYear(month: MonthKey, year: number) {
    const monthNumericValue = Month[month];
    const existingRevenue = await this.revenueRepository.findByMonthAndYear(
      monthNumericValue,
      year
    );

    if (existingRevenue) {
      const monthName = MonthDescription[month];
      const message = `Já existe uma receita cadastrada para ${monthName} de ${year}`;

      throw new BusinessException(message);
    }
  }

  async update(updatedData: UpdateRevenueServiceInputDto) {
    await this.validateRevenueData(updatedData);

    const existingRevenue = await this.findRevenueByIdOrThrowException(
      updatedData.id
    );

    console.log(updatedData.id);

    await this.userService.verifyUserExistence(updatedData.userId);
    await this.verifyRevenueExistenceByMonthAndYearAndNotId(
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
  }

  private async validateRevenueData(revenueData: CreateRevenueServiceInputDto) {
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

  async verifyRevenueExistenceByMonthAndYearAndNotId(
    id: string,
    month: MonthKey,
    year: number
  ) {
    const monthNumericValue = Month[month];
    const params: FindByMonthAndYearAndNotId = {
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

  async listByUserId(userId: string) {
    await this.userService.verifyUserExistence(userId);

    const repositoryRevenues = await this.revenueRepository.findAllByUserId(
      userId
    );
    const revenues = repositoryRevenues.map((revenue) =>
      this.convertRevenueRepositoryDtoToRevenueServiceOutputDto(revenue)
    );

    return revenues;
  }

  private convertRevenueRepositoryDtoToRevenueServiceOutputDto(
    revenue: RevenueRepositoryDto
  ): RevenueServiceOutputDto {
    const monthKeyIndex = revenue.month - 1;
    const monthEnumKey = MonthKeys[monthKeyIndex] as MonthKey;

    return {
      id: revenue.id,
      month: monthEnumKey,
      year: revenue.year,
      amount: Number(revenue.amount),
      usedAmount: Number(revenue.used_amount)
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
}
