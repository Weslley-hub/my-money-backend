import { v4 as generateUUIDV4 } from "uuid";

import { BusinessException } from "../../api/exception";
import { ExpenseCategoryService } from "../../expense-category/services";
import {
  ExpenseCategoryPercentageRepositoryOutputDto,
  ExpenseCategoryPercentageServiceInputDto,
  ExpenseCategoryPercentageServiceOutputDto
} from "../dto";
import { ExpenseCategoryPercentageRepository } from "../respository";

export class ExpenseCategoryPercentageService {
  private expenseCategoryService: ExpenseCategoryService;
  private expenseCategoryPercentageRepository: ExpenseCategoryPercentageRepository;

  constructor() {
    this.expenseCategoryService = new ExpenseCategoryService();
    this.expenseCategoryPercentageRepository =
      new ExpenseCategoryPercentageRepository();
  }

  private async verifyAllCategoriesExistenceAndThrowsExceptionIfSomeDoenstExists(
    categoriesPercentages: ExpenseCategoryPercentageServiceInputDto[]
  ) {
    const verificationPromises = categoriesPercentages.map(
      (categoryPercentage) =>
        this.expenseCategoryService.verifyExpenseCategoryExistenceByIdAndThrowExceptionIfDoesntExist(
          categoryPercentage.categoryId
        )
    );

    await Promise.all(verificationPromises);
  }

  private verifyAllCategoriesPercentageTotalAndThrowExceptionIfExceedOneHundred(
    categoriesPercentages: ExpenseCategoryPercentageServiceInputDto[]
  ) {
    let percentageTotal = 0;

    categoriesPercentages.forEach((categoryPercentage) => {
      percentageTotal += categoryPercentage.percentage;
    });

    if (percentageTotal > 100) {
      throw new BusinessException(
        `A soma total dos percentuais das categorias não pode exceder 100%`
      );
    }
  }

  private verifyAllCategoriesAndThrowExceptionIfHasDuplicateCategories(
    categoriesPercentages: ExpenseCategoryPercentageServiceInputDto[]
  ) {
    const categoryIds = categoriesPercentages.map(
      (categoryPercentage) => categoryPercentage.categoryId
    );

    const duplicateCategories = categoryIds.filter((categoryId, index) => {
      return categoryIds.indexOf(categoryId) != index;
    });

    if (duplicateCategories.length > 0) {
      throw new BusinessException(
        "Não é possível adicionar uma categoria mais de uma vez em uma mesma receita"
      );
    }
  }

  async verifyAllCategoriesAndThrowExceptionIfCategoriesOrPercentagesAreInvalid(
    categoriesPercentages: ExpenseCategoryPercentageServiceInputDto[]
  ) {
    this.verifyAllCategoriesPercentageTotalAndThrowExceptionIfExceedOneHundred(
      categoriesPercentages
    );

    this.verifyAllCategoriesAndThrowExceptionIfHasDuplicateCategories(
      categoriesPercentages
    );

    await this.verifyAllCategoriesExistenceAndThrowsExceptionIfSomeDoenstExists(
      categoriesPercentages
    );
  }

  async create(
    revenueId: string,
    categoriesPercentages: ExpenseCategoryPercentageServiceInputDto[]
  ) {
    const categoriesPercentageInsertionPromises = categoriesPercentages.map(
      (categoryPercentage) => {
        const categoryPercentageUUID = generateUUIDV4();

        return this.expenseCategoryPercentageRepository.create({
          id: categoryPercentageUUID,
          percentage: categoryPercentage.percentage,
          revenue_id: revenueId,
          expense_category_id: categoryPercentage.categoryId
        });
      }
    );

    await Promise.all(categoriesPercentageInsertionPromises);
  }

  async findByRevenueId(revenueId: string) {
    const repositoryPercentages =
      await this.expenseCategoryPercentageRepository.findByRevenueId(revenueId);

    const expenseCategoriesPercentages = repositoryPercentages.map(
      (expenseCategoryPercentage) =>
        this.convertExpenseCategoryPercentageRepositoryOutputDtoToExpenseCategoryPercentageServiceOutputDto(
          expenseCategoryPercentage
        )
    );

    return expenseCategoriesPercentages;
  }

  private convertExpenseCategoryPercentageRepositoryOutputDtoToExpenseCategoryPercentageServiceOutputDto(
    data: ExpenseCategoryPercentageRepositoryOutputDto
  ): ExpenseCategoryPercentageServiceOutputDto {
    return {
      categoryIcon: data.icon,
      categoryId: data.id,
      categoryName: data.name,
      percentage: Number(data.percentage)
    };
  }

  async removeAllByRevenueId(revenueId: string) {
    await this.expenseCategoryPercentageRepository.removeAllByRevenueId(
      revenueId
    );
  }
}
