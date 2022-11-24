import { v4 as generateUuidV4 } from "uuid";
import { BusinessException, NotFoundException } from "../../api/exceptions";
import { UserService } from "../../user/services/user.service";

import {
  CustomExpenseCategoryRepositoryDto,
  CreateCustomExpenseCategoryServiceInput,
  UpdateCustomExpenseCategoryServiceInput,
  CreateCustomExpenseCategoryServiceOutput
} from "../dto";
import { CustomExpenseCategoryRepository } from "../repositories/custom-expense-category.repository";
import { CustomExpenseCategoryValidationSchema } from "../validation";

export class CustomExpenseCategoryService {
  private customExpenseCategoryRepository: CustomExpenseCategoryRepository;
  private userService: UserService;

  constructor() {
    this.customExpenseCategoryRepository =
      new CustomExpenseCategoryRepository();
    this.userService = new UserService();
  }

  async create(
    customExpenseCategoryData: CreateCustomExpenseCategoryServiceInput
  ) {
    const expenseCategoryId = generateUuidV4();

    const respositoryData: CustomExpenseCategoryRepositoryDto = {
      id: expenseCategoryId,
      name: customExpenseCategoryData.name,
      icon: customExpenseCategoryData.icon,
      user_id: customExpenseCategoryData.userId
    };

    await this.userService.verifyUserExistence(
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
    customExpenseCategoryData: UpdateCustomExpenseCategoryServiceInput
  ) {
    await this.validateExpenseCategoryData(customExpenseCategoryData);

    const respositoryData: CustomExpenseCategoryRepositoryDto = {
      id: customExpenseCategoryData.id,
      name: customExpenseCategoryData.name,
      icon: customExpenseCategoryData.icon,
      user_id: customExpenseCategoryData.userId
    };

    await this.userService.verifyUserExistence(
      customExpenseCategoryData.userId
    );
    await this.verifyExpenseCategoryExistenceById(customExpenseCategoryData.id);
    await this.verifyExpenseCategoryExistenceWithSameNameAndDifferentId(
      customExpenseCategoryData.name,
      customExpenseCategoryData.id
    );

    await this.customExpenseCategoryRepository.update(respositoryData);
  }

  private async validateExpenseCategoryData(
    customExpenseCategoryData: CreateCustomExpenseCategoryServiceInput
  ) {
    const validationOptions = {
      abortEarly: false
    };

    await CustomExpenseCategoryValidationSchema.validate(
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
    await this.verifyExpenseCategoryExistenceById(expenseCategoryId);
    await this.userService.verifyUserExistence(userId);

    await this.customExpenseCategoryRepository.delete(expenseCategoryId);
  }

  private async verifyExpenseCategoryExistenceById(id: string) {
    const existingExpenseCategory =
      await this.customExpenseCategoryRepository.findById(id);

    if (!existingExpenseCategory) {
      throw new NotFoundException(`Não existe uma categoria com o ID ${id}`);
    }
  }

  async list(userId: string) {
    await this.userService.verifyUserExistence(userId);

    const userCustomExpenseCategories =
      await this.customExpenseCategoryRepository.findByUserId(userId);

    const expenseCategories =
      this.mapCustomExpenseCategoryRepositoryListToCustomExpenseCategoryOutputList(
        userCustomExpenseCategories
      );

    return expenseCategories;
  }

  private mapCustomExpenseCategoryRepositoryListToCustomExpenseCategoryOutputList(
    customExpenseRepositoryCategories: CustomExpenseCategoryRepositoryDto[]
  ) {
    const customExpenseCategoriesOutput = customExpenseRepositoryCategories.map(
      (customExpenseCategory) => {
        return this.mapCustomExpenseCategoryRepositoryToCustomExpenseCategoryOutput(
          customExpenseCategory
        );
      }
    );

    return customExpenseCategoriesOutput;
  }

  private mapCustomExpenseCategoryRepositoryToCustomExpenseCategoryOutput(
    customExpenseCategory: CustomExpenseCategoryRepositoryDto
  ): CreateCustomExpenseCategoryServiceOutput {
    return {
      icon: customExpenseCategory.icon,
      id: customExpenseCategory.id,
      name: customExpenseCategory.name
    };
  }
}
