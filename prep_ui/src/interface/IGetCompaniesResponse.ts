interface ICompany {
  id: number
  name: string
}

interface IGetCompaniesResponse {
  data: Array<ICompany>
  error: null | string
}

export default IGetCompaniesResponse;
