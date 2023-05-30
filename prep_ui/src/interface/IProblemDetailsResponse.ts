import IProblemRecord from '@/interface/IProblemRecord';

interface IGetProblemDetailsResponseData {
  problem: IProblemRecord
  classifications: Array<string>
  companies: Array<ICompanyRecord>
}

interface IGetProblemDetailsResponse {
  data: IGetProblemDetailsResponseData
  error: null | string
}

export default IGetProblemDetailsResponse;
