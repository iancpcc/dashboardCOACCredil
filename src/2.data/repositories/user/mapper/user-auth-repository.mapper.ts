import { UserModel } from 'src/1.domain/models/user.model';
import { ResponseEntity } from 'src/2.data/entities/response.entity';
import { UserEntity } from 'src/2.data/entities/user.entity';
import { Mapper } from 'src/2.data/helpers/mapper/mapper';

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
