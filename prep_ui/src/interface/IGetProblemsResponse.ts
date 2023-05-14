import IGetClassificationsResponse from '@/interface/IGetClassificationsResponse';
import IProblemRecord from '@/interface/IProblemRecord';

interface IGetProblemsResponseData {
  classification: IGetClassificationsResponse
  problems: Array<IProblemRecord>
}

interface IGetProblemsResponse {
  data: IGetProblemsResponseData
  error: null | string
}

export default IGetProblemsResponse;
