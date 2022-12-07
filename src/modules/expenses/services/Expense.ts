import { BusinessException } from "../../api/exception";
import { CardRepository } from "../../card/repositories";
import { ExpenseCategoryPercentageRepository } from "../../revenue/respository";
import { RevenueService } from "../../revenue/services";
import { UserRepository } from "../../user/repositories";
import { CreateExpenseServiceInput } from "../dto";
import { CreditCardKeys, DebitCardKeys, PaymentType } from "../enums";
import { ExpenseRepository } from "../repositories";
import { ExpenseValidationSchema } from "../validation";
import { v4 as uuidv4 } from "uuid";

export class ExpenseService {
  private revenueService: RevenueService;
  private expenseCategoryPercentageRepository: ExpenseCategoryPercentageRepository;
  private cardRepository: CardRepository;
  private userRepository: UserRepository;
  private expenseRepository: ExpenseRepository;
  //findDebitCardByIdAndUserId

  constructor() {
    this.revenueService = new RevenueService();
    this.expenseCategoryPercentageRepository =
      new ExpenseCategoryPercentageRepository();
    this.cardRepository = new CardRepository();
    this.userRepository = new UserRepository();
    this.expenseRepository = new ExpenseRepository();
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
    if (CreditCardKeys.includes(expenseData.paymentType)) {
      console.log("dados");
      console.log(expenseData.creditCardId);
      console.log(expenseData.userId);
      await this.verifyIfCreditCardIsAssociatedWithUserOrThrowException(
        expenseData.creditCardId!,
        expenseData.userId
      );
    }
    const id = uuidv4();
    await this.expenseRepository.create({
      id,
      expense_user_id: expenseData.userId,
      description: expenseData.description,
      amount: expenseData.amount,
      paid: expenseData.isPaid,
      payment_type: expenseData.paymentType,
      revenue_id: expenseData.revenueId,
      number_of_installments: expenseData.numberOfInstallments,
      debit_card_id: expenseData.debitCardId
        ? expenseData.debitCardId
        : undefined,
      credit_card_id: expenseData.creditCardId
        ? expenseData.creditCardId
        : undefined,
      expense_category_id: expenseData.expenseCategoryId,
      //user_id: expenseData.userId, //ainda nao existe no Table expense no DB
      date: new Date("2021-04-23T10:00:00.000")
    });
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

  private async verifyIfCreditCardIsAssociatedWithUserOrThrowException(
    creditCardId: string,
    userId: string
  ) {
    const creditCard = await this.cardRepository.findCreditCardByIdAndUserId(
      creditCardId,
      userId
    );

    if (!creditCard) {
      throw new BusinessException(
        `OO cartão de ID ${creditCardId} não está associado ao usuário de ID ${userId}`
      );
    }
  }

  private async verifyIfDebitCardIsAssociatedWithUserOrThrowException(
    debitCardId: string,
    userId: string
  ) {
    const creditCard = await this.cardRepository.findDebitCardByIdAndUserId(
      debitCardId,
      userId
    );

    if (!debitCardId) {
      throw new BusinessException(
        `O cartão de ID ${debitCardId} não está associado ao usuário de ID ${userId}`
      );
    }
  }
  async list(userId: string) {
    if (userId) {
      await this.verificationExistingUserById(userId);
      const expenseData = await this.expenseRepository.findExpenseById(userId);
      return expenseData;
    }
  }
  private async verificationExistingUserById(user_id: string) {
    const id = await this.userRepository.findById(user_id);

    if (!id) {
      throw new BusinessException(`Não existe um usuario com o id: ${user_id}`);
    }
  }
}
