import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {
    /** */
  }

  execute({ email, name }: IRequest): User {
    const userAlreadyExists = this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new Error("Email already in use. Choose another!");
    }

    const user = this.usersRepository.create({
      email,
      name,
    });

    return user;
  }
}

export { CreateUserUseCase };
