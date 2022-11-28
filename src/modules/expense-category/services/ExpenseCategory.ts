import { v4 as generateUuidV4 } from "uuid";

import { BusinessException, NotFoundException } from "../../api/exception";
import { UserService } from "../../user/services";
import {
  CreateExpenseCategoryServiceInputDto,
  ExpenseCategoryRepositoryDto,
  UpdateExpenseCategoryServiceInputDto,
  CreateExpenseCategoryServiceOutputDto
} from "../dto";
import { ExpenseCategoryRepository } from "../repositories";
import { ExpenseCategoryValidationSchema } from "../validation";

export class ExpenseCategoryService {
  private customExpenseCategoryRepository: ExpenseCategoryRepository;
  private userService: UserService;

  constructor() {
    this.customExpenseCategoryRepository = new ExpenseCategoryRepository();
    this.userService = new UserService();
  }

  async create(
    customExpenseCategoryData: CreateExpenseCategoryServiceInputDto
  ) {
    const expenseCategoryId = generateUuidV4();

    const respositoryData: ExpenseCategoryRepositoryDto = {
      id: expenseCategoryId,
      name: customExpenseCategoryData.name,
      icon: customExpenseCategoryData.icon,
      user_id: customExpenseCategoryData.userId
    };

    await this.userService.verifyUserExistenceAndThrowExceptionIfDoesntExists(
      customExpenseCategoryData.userId
    );
    await this.validateExpenseCategoryData(customExpenseCategoryData);
    await this.verifyExpenseCategoryExistenceWithSameName(respositoryData.name);

    await this.customExpenseCategoryRepository.create(respositoryData);
  }

  private async verifyExpenseCategoryExistenceWithSameName(name: string) {
    const nameWithoutEndBlankSpaces = name.trimEnd();

    const expenseCategoryWithSameName =
      await this.customExpenseCategoryRepository.findByName(
        nameWithoutEndBlankSpaces
      );

    if (expenseCategoryWithSameName) {
      throw new BusinessException(
        `Já existe a categoria ${nameWithoutEndBlankSpaces}`
      );
    }
  }

  async update(
    customExpenseCategoryData: UpdateExpenseCategoryServiceInputDto
  ) {
    await this.validateExpenseCategoryData(customExpenseCategoryData);

    const respositoryData: ExpenseCategoryRepositoryDto = {
      id: customExpenseCategoryData.id,
      name: customExpenseCategoryData.name,
      icon: customExpenseCategoryData.icon,
      user_id: customExpenseCategoryData.userId
    };

    await this.userService.verifyUserExistenceAndThrowExceptionIfDoesntExists(
      customExpenseCategoryData.userId
    );
    await this.verifyExpenseCategoryExistenceByIdAndThrowExceptionIfDoesntExist(
      customExpenseCategoryData.id
    );
    await this.verifyExpenseCategoryExistenceWithSameNameAndDifferentId(
      customExpenseCategoryData.name,
      customExpenseCategoryData.id
    );

    await this.customExpenseCategoryRepository.update(respositoryData);
  }

  private async validateExpenseCategoryData(
    customExpenseCategoryData: CreateExpenseCategoryServiceInputDto
  ) {
    const validationOptions = {
      abortEarly: false
    };

    await ExpenseCategoryValidationSchema.validate(
      customExpenseCategoryData,
      validationOptions
    );
  }

  private async verifyExpenseCategoryExistenceWithSameNameAndDifferentId(
    name: string,
    expenseId: string
  ) {
    const nameWithoutEndBlankSpaces = name.trimEnd();

    const expenseCategoriesWithSameName =
      await this.customExpenseCategoryRepository.findByNameAndNotId(
        nameWithoutEndBlankSpaces,
        expenseId
      );

    if (expenseCategoriesWithSameName.length > 0) {
      throw new BusinessException(
        `Já existe a categoria ${nameWithoutEndBlankSpaces}`
      );
    }
  }

  async delete(expenseCategoryId: string, userId: string) {
    await this.verifyExpenseCategoryExistenceByIdAndThrowExceptionIfDoesntExist(
      expenseCategoryId
    );
    await this.userService.verifyUserExistenceAndThrowExceptionIfDoesntExists(
      userId
    );

    await this.customExpenseCategoryRepository.delete(expenseCategoryId);
  }

  async verifyExpenseCategoryExistenceByIdAndThrowExceptionIfDoesntExist(
    id: string
  ) {
    const existingExpenseCategory =
      await this.customExpenseCategoryRepository.findById(id);

    if (!existingExpenseCategory) {
      throw new NotFoundException(`Não existe uma categoria com o ID ${id}`);
    }
  }

  async list(userId: string) {
    await this.userService.verifyUserExistenceAndThrowExceptionIfDoesntExists(
      userId
    );

    const userExpenseCategories =
      await this.customExpenseCategoryRepository.findByUserId(userId);

    const expenseCategories =
      this.mapExpenseCategoryRepositoryListToExpenseCategoryOutputList(
        userExpenseCategories
      );

    return expenseCategories;
  }

  private mapExpenseCategoryRepositoryListToExpenseCategoryOutputList(
    customExpenseRepositoryCategories: ExpenseCategoryRepositoryDto[]
  ) {
    const customExpenseCategoriesOutput = customExpenseRepositoryCategories.map(
      (customExpenseCategory) => {
        return this.mapExpenseCategoryRepositoryToExpenseCategoryOutput(
          customExpenseCategory
        );
      }
    );

    return customExpenseCategoriesOutput;
  }

  private mapExpenseCategoryRepositoryToExpenseCategoryOutput(
    customExpenseCategory: ExpenseCategoryRepositoryDto
  ): CreateExpenseCategoryServiceOutputDto {
    return {
      icon: customExpenseCategory.icon,
      id: customExpenseCategory.id,
      name: customExpenseCategory.name
    };
  }
}
