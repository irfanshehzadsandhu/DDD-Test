import BaseDTO from "../Utils/BaseDTO";
import PaginationOptions from "../../Infrastructure/Utils/PaginationOptions";

class FetchAllProfilesDTO extends BaseDTO {
  private readonly page: number = 1;
  private readonly perPage: number = 10;
  public paginationOptions: PaginationOptions

  constructor(request) {
    super(request);
    this.allowedRoles = []
    this.page = request.query.page;
    this.perPage = request.query.perPage;
    this.paginationOptions = new PaginationOptions(this.page, this.perPage)
  }
}

export default FetchAllProfilesDTO;