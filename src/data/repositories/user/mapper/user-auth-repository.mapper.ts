import { UserModel } from 'src/domain/models/user.model';
import { ResponseEntity } from 'src/data/entities/response.entity';
import { UserEntity } from 'src/data/entities/user.entity';
import { Mapper } from 'src/data/helpers/mapper/mapper';

// export class UserAuthRepositoryMapper extends Mapper<
//   ResponseEntity,
//   UserModel
// > {
//   mapFrom(param: ResponseEntity): UserModel {
//     const {user} = param.data ?? "no name"

//     return {
//       username: user
//     };
//   }

//   mapTo(param: UserModel): ResponseEntity  {
//     return {};
//   }
// }
