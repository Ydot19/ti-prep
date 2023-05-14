import IClassificationRecord from '@/interface/IClassificationRecord';

interface IClassificationResponseData {
  classifications: Array<IClassificationRecord>
  company: null | string
}

interface IClassificationResponse {
  data: IClassificationResponseData
  error: null | string
}

export default IClassificationResponse;
