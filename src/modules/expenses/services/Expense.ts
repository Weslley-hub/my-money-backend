import { BusinessException } from "../../api/exception";
import { CardRepository } from "../../card/repositories";
import { ExpenseCategoryPercentageRepository } from "../../revenue/respository";
import { RevenueService } from "../../revenue/services";
import { CreateExpenseServiceInput } from "../dto";
import { DebitCardKeys, PaymentType } from "../enums";
import { ExpenseValidationSchema } from "../validation";

export class ExpenseService {
  private revenueService: RevenueService;
  private expenseCategoryPercentageRepository: ExpenseCategoryPercentageRepository;
  private cardRepository: CardRepository;

  constructor() {
    this.revenueService = new RevenueService();
    this.expenseCategoryPercentageRepository =
      new ExpenseCategoryPercentageRepository();
    this.cardRepository = new CardRepository();
  }

  async create(expenseData: CreateExpenseServiceInput) {
    await this.validateExpenseData(expenseData);
    await this.revenueService.findRevenueByIdOrThrowException(
      expenseData.revenueId
    );

    await this.verifyIfExpenseCategoryIsAssociatedWithRevenueOrThrowException(
      expenseData.revenueId,
      expenseData.expenseCategoryId
    );

    if (DebitCardKeys.includes(expenseData.paymentType)) {
      await this.verifyIfDebitCardIsAssociatedWithUserOrThrowException(
        expenseData.debitCardId!,
        expenseData.userId
      );
    }
  }

  private async validateExpenseData(expenseData: CreateExpenseServiceInput) {
    await ExpenseValidationSchema.validate(expenseData, {
      abortEarly: false
    });
  }

  private async verifyIfExpenseCategoryIsAssociatedWithRevenueOrThrowException(
    revenueId: string,
    expenseCategoryId: string
  ) {
    const expenseCategory =
      await this.expenseCategoryPercentageRepository.findByRevenueIdAndExpenseCategoryId(
        revenueId,
        expenseCategoryId
      );

    if (!expenseCategory) {
      throw new BusinessException(
        `A categoria de ID: ${expenseCategoryId} não está associada à receita de ID: ${revenueId}`
      );
    }
  }

  private async verifyIfDebitCardIsAssociatedWithUserOrThrowException(
    debitCardId: string,
    userId: string
  ) {
    const debitCard = await this.cardRepository.findDebitCardByIdAndUserId(
      debitCardId,
      userId
    );

    if (!debitCard) {
      throw new BusinessException(
        `O cartão de ID ${debitCardId} não está associado ao usuário de ID ${userId}`
      );
    }
  }
}
