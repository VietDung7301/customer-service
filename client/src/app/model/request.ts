export class Request {
  id: number;
  userName: string;
  userEmail: string;
  userAvatar: string;
  content: string;
  staff: string;
  status: string;
  sendOnDate: string;

  constructor(
    id: number,
    userName: string,
    userEmail: string,
    userAvatar: string,
    content: string,
    staff: string,
    status: string,
    sendOnDate: string
  ) {
    this.id=id;
    this.userName = userName;
    this.userEmail = userEmail;
    this.userAvatar = userAvatar;
    this.content = content;
    this.staff = staff;
    this.status = status;
    this.sendOnDate = sendOnDate;
  }
}
