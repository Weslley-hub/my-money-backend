import { NotFoundException, BusinessException } from "../../api/exception";
import { CardController } from "../../creditCard/controllers";
import { CreditCardRepository } from "../../creditCard/repositories";
import { DebitCardRepository } from "../../debitCard/repositories";
import { ExpenseCategoryRepository } from "../../expense-category/repositories/ExpenseCategory";
import { ExpenseRepository } from "../../expenses/repositories";
import { ExpenseCategoryPercentageRepository } from "../../revenue/respository/ExpenseCategoryPercentage";
import { RevenueRepository } from "../../revenue/respository/Revenue";
import { UserPasswordService } from "../../security/services";
import {
  CreateUserDto,
  UpdateUserDto,
  UserOutputDto,
  UserRepositoryDto
} from "../dto";
import { UserRepository } from "../repositories";
import { UserValidationSchema } from "../validation";

export class UserService {
  private userRepository: UserRepository;
  private expenseRepository: ExpenseRepository;
  // private creditCardRepository:
  private debitCardRepository: DebitCardRepository;
  private creditCardRepository: CreditCardRepository;
  private expenseCategoryPercentageRepository: ExpenseCategoryPercentageRepository;
  private revenueRepository: RevenueRepository;
  private expenseCategoryRepository: ExpenseCategoryRepository;

  constructor() {
    this.userRepository = new UserRepository();
    this.expenseRepository = new ExpenseRepository();
    this.debitCardRepository = new DebitCardRepository();
    this.creditCardRepository = new CreditCardRepository();
    this.expenseCategoryPercentageRepository =
      new ExpenseCategoryPercentageRepository();
    this.revenueRepository = new RevenueRepository();
    this.expenseCategoryRepository = new ExpenseCategoryRepository();
  }

  async update(updateUserProps: UpdateUserDto): Promise<void> {
    const { id, data } = updateUserProps;

    await this.validateUserData(data);
    await this.verifyUserExistenceAndThrowExceptionIfDoesntExists(id);
    await this.verifyExistenceOfUsersWithSameEmail(data.email, id);

    data.password = UserPasswordService.encryptPassword(data.password);
    await this.userRepository.update({
      avatar: data.avatar,
      email: data.email,
      name: data.name,
      password: data.password,
      id
    });
  }

  async verifyUserExistenceAndThrowExceptionIfDoesntExists(userId: string) {
    const userFound = await this.userRepository.findById(userId);

    if (!userFound) {
      throw new NotFoundException(
        `Não existe usuário cadastrado com ID ${userId}`
      );
    }
  }

  private async verifyExistenceOfUsersWithSameEmail(
    email: string,
    userInVerificationId: string
  ) {
    const usersWithSameEmail = await this.userRepository.findAllByEmail(email);

    if (usersWithSameEmail.length === 0) {
      return;
    }

    if (usersWithSameEmail.length > 1) {
      throw new BusinessException(`Já existe um usuário cadastro com ${email}`);
    }

    if (usersWithSameEmail[0].id !== userInVerificationId) {
      throw new BusinessException(`Já existe um usuário cadastro com ${email}`);
    }
  }

  async validateUserData(user: CreateUserDto) {
    await UserValidationSchema.validate(user, { abortEarly: false });
  }

  async findById(id: string): Promise<UserOutputDto> {
    const userFound = await this.userRepository.findById(id);

    if (!userFound) {
      throw new NotFoundException(`Não existe usuário cadastrado com ID ${id}`);
    }

    const userOutputDto = this.convertUserModelToUserOutputDto(userFound);
    return userOutputDto;
  }

  private convertUserModelToUserOutputDto(
    //<<<<<<< integracaoAlexx
    //    userModal: UserRepositoryDto
    //=======
    userModal: CreateUserDto
  ): UserOutputDto {
    return {
      name: userModal.name,
      email: userModal.email,
      avatar: userModal.avatar
    };
  }

  async delete(id: string): Promise<void> {
    const userFound = await this.userRepository.findById(id);

    if (!userFound) {
      throw new NotFoundException(`Não existe usuário cadastrado com ID ${id}`);
    }
    //expenses,debit_cards, credit_cards, revenue_category_percentages, revenues, expense_categories
    await this.expenseRepository.deleteExpenseByUserId(id);
    await this.debitCardRepository.deleteDebitByUserId(id);
    await this.creditCardRepository.deleteCreditByUserId(id);
    await this.expenseRepository.deleteExpenseByUserId(id);
    await this.revenueRepository.deleteRevenueByUserId(id);
    await this.expenseCategoryRepository.deleteCategoryByUserId(id);

    /*
      deleteCategoryByUserId(userId: string){
      return dbConnection<UpdateExpenseRepository>("expenses")
        .delete("*")
        .where("userId", "=", userId);
      }
    */
    // await this.expenseRepository.deleteExpenseByUserId(id)
    await this.userRepository.delete(id);
  }
}
