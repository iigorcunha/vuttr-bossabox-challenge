export default interface ICreateToolDTO {
  title: string;
  link: string;
  description: string;
  tags?: string[];
  user_id: string;
}
