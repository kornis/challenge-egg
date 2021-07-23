import { User } from "../../domain/entities";

export function isFather(father: User, child_id: string) {
  return father.children.includes(child_id);
}
