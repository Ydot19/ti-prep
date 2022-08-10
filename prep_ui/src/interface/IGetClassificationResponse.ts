interface IClassificationDetail {
  classification: string
  count: number
}

interface IClassificationResponseData {
  classifications: Array<IClassificationDetail>
  company: null | string
}

interface IClassificationResponse {
  data: IClassificationResponseData
  error: null | string
}

export default IClassificationResponse;
