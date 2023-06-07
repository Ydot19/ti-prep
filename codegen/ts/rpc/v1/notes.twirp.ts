import {
  TwirpContext,
  TwirpServer,
  RouterEvents,
  TwirpError,
  TwirpErrorCode,
  Interceptor,
  TwirpContentType,
  chainInterceptors,
} from "twirp-ts";
import {
  GetProblemCategoriesRequest,
  GetProblemCategoriesResponse,
  GetProblemsByCategoryRequest,
  GetProblemsByCategoryResponse,
  GetProblemByIdRequest,
  GetProblemByIdResponse,
  GetProblemNotesByIdRequest,
  GetProblemNotesByIdResponse,
  GetImplementationNotesByIdRequest,
  GetImplementationNotesByIdResponse,
  CreateOrUpdateProblemDetailsRequest,
  CreateOrUpdateProblemDetailsResponse,
  CreateOrUpdateProblemNotesRequest,
  CreateOrUpdateProblemNotesResponse,
  GetAlgorithmCategoriesRequest,
  GetAlgorithmCategoriesResponse,
  GetAlgorithmsByCategoryRequest,
  GetAlgorithmsByCategoryResponse,
  CreateOrUpdateAlgorithmRequest,
  CreateOrUpdateAlgorithmResponse,
} from "./notes";

//==================================//
//          Client Code             //
//==================================//

interface Rpc {
  request(
    service: string,
    method: string,
    contentType: "application/json" | "application/protobuf",
    data: object | Uint8Array
  ): Promise<object | Uint8Array>;
}

export interface NotesServiceClient {
  GetProblemCategories(
    request: GetProblemCategoriesRequest
  ): Promise<GetProblemCategoriesResponse>;
  GetProblemsByCategory(
    request: GetProblemsByCategoryRequest
  ): Promise<GetProblemsByCategoryResponse>;
  GetProblemById(
    request: GetProblemByIdRequest
  ): Promise<GetProblemByIdResponse>;
  GetProblemNotesById(
    request: GetProblemNotesByIdRequest
  ): Promise<GetProblemNotesByIdResponse>;
  GetImplementationNotesById(
    request: GetImplementationNotesByIdRequest
  ): Promise<GetImplementationNotesByIdResponse>;
  CreateOrUpdateProblemDetails(
    request: CreateOrUpdateProblemDetailsRequest
  ): Promise<CreateOrUpdateProblemDetailsResponse>;
  CreateOrUpdateProblemNotes(
    request: CreateOrUpdateProblemNotesRequest
  ): Promise<CreateOrUpdateProblemNotesResponse>;
  GetAlgorithmCategories(
    request: GetAlgorithmCategoriesRequest
  ): Promise<GetAlgorithmCategoriesResponse>;
  GetAlgorithmsByCategory(
    request: GetAlgorithmsByCategoryRequest
  ): Promise<GetAlgorithmsByCategoryResponse>;
  CreateOrUpdateAlgorithm(
    request: CreateOrUpdateAlgorithmRequest
  ): Promise<CreateOrUpdateAlgorithmResponse>;
}

export class NotesServiceClientJSON implements NotesServiceClient {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.GetProblemCategories.bind(this);
    this.GetProblemsByCategory.bind(this);
    this.GetProblemById.bind(this);
    this.GetProblemNotesById.bind(this);
    this.GetImplementationNotesById.bind(this);
    this.CreateOrUpdateProblemDetails.bind(this);
    this.CreateOrUpdateProblemNotes.bind(this);
    this.GetAlgorithmCategories.bind(this);
    this.GetAlgorithmsByCategory.bind(this);
    this.CreateOrUpdateAlgorithm.bind(this);
  }
  GetProblemCategories(
    request: GetProblemCategoriesRequest
  ): Promise<GetProblemCategoriesResponse> {
    const data = GetProblemCategoriesRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "rpc.NotesService",
      "GetProblemCategories",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      GetProblemCategoriesResponse.fromJson(data as any, {
        ignoreUnknownFields: true,
      })
    );
  }

  GetProblemsByCategory(
    request: GetProblemsByCategoryRequest
  ): Promise<GetProblemsByCategoryResponse> {
    const data = GetProblemsByCategoryRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "rpc.NotesService",
      "GetProblemsByCategory",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      GetProblemsByCategoryResponse.fromJson(data as any, {
        ignoreUnknownFields: true,
      })
    );
  }

  GetProblemById(
    request: GetProblemByIdRequest
  ): Promise<GetProblemByIdResponse> {
    const data = GetProblemByIdRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "rpc.NotesService",
      "GetProblemById",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      GetProblemByIdResponse.fromJson(data as any, {
        ignoreUnknownFields: true,
      })
    );
  }

  GetProblemNotesById(
    request: GetProblemNotesByIdRequest
  ): Promise<GetProblemNotesByIdResponse> {
    const data = GetProblemNotesByIdRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "rpc.NotesService",
      "GetProblemNotesById",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      GetProblemNotesByIdResponse.fromJson(data as any, {
        ignoreUnknownFields: true,
      })
    );
  }

  GetImplementationNotesById(
    request: GetImplementationNotesByIdRequest
  ): Promise<GetImplementationNotesByIdResponse> {
    const data = GetImplementationNotesByIdRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "rpc.NotesService",
      "GetImplementationNotesById",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      GetImplementationNotesByIdResponse.fromJson(data as any, {
        ignoreUnknownFields: true,
      })
    );
  }

  CreateOrUpdateProblemDetails(
    request: CreateOrUpdateProblemDetailsRequest
  ): Promise<CreateOrUpdateProblemDetailsResponse> {
    const data = CreateOrUpdateProblemDetailsRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "rpc.NotesService",
      "CreateOrUpdateProblemDetails",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      CreateOrUpdateProblemDetailsResponse.fromJson(data as any, {
        ignoreUnknownFields: true,
      })
    );
  }

  CreateOrUpdateProblemNotes(
    request: CreateOrUpdateProblemNotesRequest
  ): Promise<CreateOrUpdateProblemNotesResponse> {
    const data = CreateOrUpdateProblemNotesRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "rpc.NotesService",
      "CreateOrUpdateProblemNotes",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      CreateOrUpdateProblemNotesResponse.fromJson(data as any, {
        ignoreUnknownFields: true,
      })
    );
  }

  GetAlgorithmCategories(
    request: GetAlgorithmCategoriesRequest
  ): Promise<GetAlgorithmCategoriesResponse> {
    const data = GetAlgorithmCategoriesRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "rpc.NotesService",
      "GetAlgorithmCategories",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      GetAlgorithmCategoriesResponse.fromJson(data as any, {
        ignoreUnknownFields: true,
      })
    );
  }

  GetAlgorithmsByCategory(
    request: GetAlgorithmsByCategoryRequest
  ): Promise<GetAlgorithmsByCategoryResponse> {
    const data = GetAlgorithmsByCategoryRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "rpc.NotesService",
      "GetAlgorithmsByCategory",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      GetAlgorithmsByCategoryResponse.fromJson(data as any, {
        ignoreUnknownFields: true,
      })
    );
  }

  CreateOrUpdateAlgorithm(
    request: CreateOrUpdateAlgorithmRequest
  ): Promise<CreateOrUpdateAlgorithmResponse> {
    const data = CreateOrUpdateAlgorithmRequest.toJson(request, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    });
    const promise = this.rpc.request(
      "rpc.NotesService",
      "CreateOrUpdateAlgorithm",
      "application/json",
      data as object
    );
    return promise.then((data) =>
      CreateOrUpdateAlgorithmResponse.fromJson(data as any, {
        ignoreUnknownFields: true,
      })
    );
  }
}

export class NotesServiceClientProtobuf implements NotesServiceClient {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.GetProblemCategories.bind(this);
    this.GetProblemsByCategory.bind(this);
    this.GetProblemById.bind(this);
    this.GetProblemNotesById.bind(this);
    this.GetImplementationNotesById.bind(this);
    this.CreateOrUpdateProblemDetails.bind(this);
    this.CreateOrUpdateProblemNotes.bind(this);
    this.GetAlgorithmCategories.bind(this);
    this.GetAlgorithmsByCategory.bind(this);
    this.CreateOrUpdateAlgorithm.bind(this);
  }
  GetProblemCategories(
    request: GetProblemCategoriesRequest
  ): Promise<GetProblemCategoriesResponse> {
    const data = GetProblemCategoriesRequest.toBinary(request);
    const promise = this.rpc.request(
      "rpc.NotesService",
      "GetProblemCategories",
      "application/protobuf",
      data
    );
    return promise.then((data) =>
      GetProblemCategoriesResponse.fromBinary(data as Uint8Array)
    );
  }

  GetProblemsByCategory(
    request: GetProblemsByCategoryRequest
  ): Promise<GetProblemsByCategoryResponse> {
    const data = GetProblemsByCategoryRequest.toBinary(request);
    const promise = this.rpc.request(
      "rpc.NotesService",
      "GetProblemsByCategory",
      "application/protobuf",
      data
    );
    return promise.then((data) =>
      GetProblemsByCategoryResponse.fromBinary(data as Uint8Array)
    );
  }

  GetProblemById(
    request: GetProblemByIdRequest
  ): Promise<GetProblemByIdResponse> {
    const data = GetProblemByIdRequest.toBinary(request);
    const promise = this.rpc.request(
      "rpc.NotesService",
      "GetProblemById",
      "application/protobuf",
      data
    );
    return promise.then((data) =>
      GetProblemByIdResponse.fromBinary(data as Uint8Array)
    );
  }

  GetProblemNotesById(
    request: GetProblemNotesByIdRequest
  ): Promise<GetProblemNotesByIdResponse> {
    const data = GetProblemNotesByIdRequest.toBinary(request);
    const promise = this.rpc.request(
      "rpc.NotesService",
      "GetProblemNotesById",
      "application/protobuf",
      data
    );
    return promise.then((data) =>
      GetProblemNotesByIdResponse.fromBinary(data as Uint8Array)
    );
  }

  GetImplementationNotesById(
    request: GetImplementationNotesByIdRequest
  ): Promise<GetImplementationNotesByIdResponse> {
    const data = GetImplementationNotesByIdRequest.toBinary(request);
    const promise = this.rpc.request(
      "rpc.NotesService",
      "GetImplementationNotesById",
      "application/protobuf",
      data
    );
    return promise.then((data) =>
      GetImplementationNotesByIdResponse.fromBinary(data as Uint8Array)
    );
  }

  CreateOrUpdateProblemDetails(
    request: CreateOrUpdateProblemDetailsRequest
  ): Promise<CreateOrUpdateProblemDetailsResponse> {
    const data = CreateOrUpdateProblemDetailsRequest.toBinary(request);
    const promise = this.rpc.request(
      "rpc.NotesService",
      "CreateOrUpdateProblemDetails",
      "application/protobuf",
      data
    );
    return promise.then((data) =>
      CreateOrUpdateProblemDetailsResponse.fromBinary(data as Uint8Array)
    );
  }

  CreateOrUpdateProblemNotes(
    request: CreateOrUpdateProblemNotesRequest
  ): Promise<CreateOrUpdateProblemNotesResponse> {
    const data = CreateOrUpdateProblemNotesRequest.toBinary(request);
    const promise = this.rpc.request(
      "rpc.NotesService",
      "CreateOrUpdateProblemNotes",
      "application/protobuf",
      data
    );
    return promise.then((data) =>
      CreateOrUpdateProblemNotesResponse.fromBinary(data as Uint8Array)
    );
  }

  GetAlgorithmCategories(
    request: GetAlgorithmCategoriesRequest
  ): Promise<GetAlgorithmCategoriesResponse> {
    const data = GetAlgorithmCategoriesRequest.toBinary(request);
    const promise = this.rpc.request(
      "rpc.NotesService",
      "GetAlgorithmCategories",
      "application/protobuf",
      data
    );
    return promise.then((data) =>
      GetAlgorithmCategoriesResponse.fromBinary(data as Uint8Array)
    );
  }

  GetAlgorithmsByCategory(
    request: GetAlgorithmsByCategoryRequest
  ): Promise<GetAlgorithmsByCategoryResponse> {
    const data = GetAlgorithmsByCategoryRequest.toBinary(request);
    const promise = this.rpc.request(
      "rpc.NotesService",
      "GetAlgorithmsByCategory",
      "application/protobuf",
      data
    );
    return promise.then((data) =>
      GetAlgorithmsByCategoryResponse.fromBinary(data as Uint8Array)
    );
  }

  CreateOrUpdateAlgorithm(
    request: CreateOrUpdateAlgorithmRequest
  ): Promise<CreateOrUpdateAlgorithmResponse> {
    const data = CreateOrUpdateAlgorithmRequest.toBinary(request);
    const promise = this.rpc.request(
      "rpc.NotesService",
      "CreateOrUpdateAlgorithm",
      "application/protobuf",
      data
    );
    return promise.then((data) =>
      CreateOrUpdateAlgorithmResponse.fromBinary(data as Uint8Array)
    );
  }
}

//==================================//
//          Server Code             //
//==================================//

export interface NotesServiceTwirp<T extends TwirpContext = TwirpContext> {
  GetProblemCategories(
    ctx: T,
    request: GetProblemCategoriesRequest
  ): Promise<GetProblemCategoriesResponse>;
  GetProblemsByCategory(
    ctx: T,
    request: GetProblemsByCategoryRequest
  ): Promise<GetProblemsByCategoryResponse>;
  GetProblemById(
    ctx: T,
    request: GetProblemByIdRequest
  ): Promise<GetProblemByIdResponse>;
  GetProblemNotesById(
    ctx: T,
    request: GetProblemNotesByIdRequest
  ): Promise<GetProblemNotesByIdResponse>;
  GetImplementationNotesById(
    ctx: T,
    request: GetImplementationNotesByIdRequest
  ): Promise<GetImplementationNotesByIdResponse>;
  CreateOrUpdateProblemDetails(
    ctx: T,
    request: CreateOrUpdateProblemDetailsRequest
  ): Promise<CreateOrUpdateProblemDetailsResponse>;
  CreateOrUpdateProblemNotes(
    ctx: T,
    request: CreateOrUpdateProblemNotesRequest
  ): Promise<CreateOrUpdateProblemNotesResponse>;
  GetAlgorithmCategories(
    ctx: T,
    request: GetAlgorithmCategoriesRequest
  ): Promise<GetAlgorithmCategoriesResponse>;
  GetAlgorithmsByCategory(
    ctx: T,
    request: GetAlgorithmsByCategoryRequest
  ): Promise<GetAlgorithmsByCategoryResponse>;
  CreateOrUpdateAlgorithm(
    ctx: T,
    request: CreateOrUpdateAlgorithmRequest
  ): Promise<CreateOrUpdateAlgorithmResponse>;
}

export enum NotesServiceMethod {
  GetProblemCategories = "GetProblemCategories",
  GetProblemsByCategory = "GetProblemsByCategory",
  GetProblemById = "GetProblemById",
  GetProblemNotesById = "GetProblemNotesById",
  GetImplementationNotesById = "GetImplementationNotesById",
  CreateOrUpdateProblemDetails = "CreateOrUpdateProblemDetails",
  CreateOrUpdateProblemNotes = "CreateOrUpdateProblemNotes",
  GetAlgorithmCategories = "GetAlgorithmCategories",
  GetAlgorithmsByCategory = "GetAlgorithmsByCategory",
  CreateOrUpdateAlgorithm = "CreateOrUpdateAlgorithm",
}

export const NotesServiceMethodList = [
  NotesServiceMethod.GetProblemCategories,
  NotesServiceMethod.GetProblemsByCategory,
  NotesServiceMethod.GetProblemById,
  NotesServiceMethod.GetProblemNotesById,
  NotesServiceMethod.GetImplementationNotesById,
  NotesServiceMethod.CreateOrUpdateProblemDetails,
  NotesServiceMethod.CreateOrUpdateProblemNotes,
  NotesServiceMethod.GetAlgorithmCategories,
  NotesServiceMethod.GetAlgorithmsByCategory,
  NotesServiceMethod.CreateOrUpdateAlgorithm,
];

export function createNotesServiceServer<T extends TwirpContext = TwirpContext>(
  service: NotesServiceTwirp<T>
) {
  return new TwirpServer<NotesServiceTwirp, T>({
    service,
    packageName: "rpc",
    serviceName: "NotesService",
    methodList: NotesServiceMethodList,
    matchRoute: matchNotesServiceRoute,
  });
}

function matchNotesServiceRoute<T extends TwirpContext = TwirpContext>(
  method: string,
  events: RouterEvents<T>
) {
  switch (method) {
    case "GetProblemCategories":
      return async (
        ctx: T,
        service: NotesServiceTwirp,
        data: Buffer,
        interceptors?: Interceptor<
          T,
          GetProblemCategoriesRequest,
          GetProblemCategoriesResponse
        >[]
      ) => {
        ctx = { ...ctx, methodName: "GetProblemCategories" };
        await events.onMatch(ctx);
        return handleNotesServiceGetProblemCategoriesRequest(
          ctx,
          service,
          data,
          interceptors
        );
      };
    case "GetProblemsByCategory":
      return async (
        ctx: T,
        service: NotesServiceTwirp,
        data: Buffer,
        interceptors?: Interceptor<
          T,
          GetProblemsByCategoryRequest,
          GetProblemsByCategoryResponse
        >[]
      ) => {
        ctx = { ...ctx, methodName: "GetProblemsByCategory" };
        await events.onMatch(ctx);
        return handleNotesServiceGetProblemsByCategoryRequest(
          ctx,
          service,
          data,
          interceptors
        );
      };
    case "GetProblemById":
      return async (
        ctx: T,
        service: NotesServiceTwirp,
        data: Buffer,
        interceptors?: Interceptor<
          T,
          GetProblemByIdRequest,
          GetProblemByIdResponse
        >[]
      ) => {
        ctx = { ...ctx, methodName: "GetProblemById" };
        await events.onMatch(ctx);
        return handleNotesServiceGetProblemByIdRequest(
          ctx,
          service,
          data,
          interceptors
        );
      };
    case "GetProblemNotesById":
      return async (
        ctx: T,
        service: NotesServiceTwirp,
        data: Buffer,
        interceptors?: Interceptor<
          T,
          GetProblemNotesByIdRequest,
          GetProblemNotesByIdResponse
        >[]
      ) => {
        ctx = { ...ctx, methodName: "GetProblemNotesById" };
        await events.onMatch(ctx);
        return handleNotesServiceGetProblemNotesByIdRequest(
          ctx,
          service,
          data,
          interceptors
        );
      };
    case "GetImplementationNotesById":
      return async (
        ctx: T,
        service: NotesServiceTwirp,
        data: Buffer,
        interceptors?: Interceptor<
          T,
          GetImplementationNotesByIdRequest,
          GetImplementationNotesByIdResponse
        >[]
      ) => {
        ctx = { ...ctx, methodName: "GetImplementationNotesById" };
        await events.onMatch(ctx);
        return handleNotesServiceGetImplementationNotesByIdRequest(
          ctx,
          service,
          data,
          interceptors
        );
      };
    case "CreateOrUpdateProblemDetails":
      return async (
        ctx: T,
        service: NotesServiceTwirp,
        data: Buffer,
        interceptors?: Interceptor<
          T,
          CreateOrUpdateProblemDetailsRequest,
          CreateOrUpdateProblemDetailsResponse
        >[]
      ) => {
        ctx = { ...ctx, methodName: "CreateOrUpdateProblemDetails" };
        await events.onMatch(ctx);
        return handleNotesServiceCreateOrUpdateProblemDetailsRequest(
          ctx,
          service,
          data,
          interceptors
        );
      };
    case "CreateOrUpdateProblemNotes":
      return async (
        ctx: T,
        service: NotesServiceTwirp,
        data: Buffer,
        interceptors?: Interceptor<
          T,
          CreateOrUpdateProblemNotesRequest,
          CreateOrUpdateProblemNotesResponse
        >[]
      ) => {
        ctx = { ...ctx, methodName: "CreateOrUpdateProblemNotes" };
        await events.onMatch(ctx);
        return handleNotesServiceCreateOrUpdateProblemNotesRequest(
          ctx,
          service,
          data,
          interceptors
        );
      };
    case "GetAlgorithmCategories":
      return async (
        ctx: T,
        service: NotesServiceTwirp,
        data: Buffer,
        interceptors?: Interceptor<
          T,
          GetAlgorithmCategoriesRequest,
          GetAlgorithmCategoriesResponse
        >[]
      ) => {
        ctx = { ...ctx, methodName: "GetAlgorithmCategories" };
        await events.onMatch(ctx);
        return handleNotesServiceGetAlgorithmCategoriesRequest(
          ctx,
          service,
          data,
          interceptors
        );
      };
    case "GetAlgorithmsByCategory":
      return async (
        ctx: T,
        service: NotesServiceTwirp,
        data: Buffer,
        interceptors?: Interceptor<
          T,
          GetAlgorithmsByCategoryRequest,
          GetAlgorithmsByCategoryResponse
        >[]
      ) => {
        ctx = { ...ctx, methodName: "GetAlgorithmsByCategory" };
        await events.onMatch(ctx);
        return handleNotesServiceGetAlgorithmsByCategoryRequest(
          ctx,
          service,
          data,
          interceptors
        );
      };
    case "CreateOrUpdateAlgorithm":
      return async (
        ctx: T,
        service: NotesServiceTwirp,
        data: Buffer,
        interceptors?: Interceptor<
          T,
          CreateOrUpdateAlgorithmRequest,
          CreateOrUpdateAlgorithmResponse
        >[]
      ) => {
        ctx = { ...ctx, methodName: "CreateOrUpdateAlgorithm" };
        await events.onMatch(ctx);
        return handleNotesServiceCreateOrUpdateAlgorithmRequest(
          ctx,
          service,
          data,
          interceptors
        );
      };
    default:
      events.onNotFound();
      const msg = `no handler found`;
      throw new TwirpError(TwirpErrorCode.BadRoute, msg);
  }
}

function handleNotesServiceGetProblemCategoriesRequest<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: NotesServiceTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    GetProblemCategoriesRequest,
    GetProblemCategoriesResponse
  >[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleNotesServiceGetProblemCategoriesJSON<T>(
        ctx,
        service,
        data,
        interceptors
      );
    case TwirpContentType.Protobuf:
      return handleNotesServiceGetProblemCategoriesProtobuf<T>(
        ctx,
        service,
        data,
        interceptors
      );
    default:
      const msg = "unexpected Content-Type";
      throw new TwirpError(TwirpErrorCode.BadRoute, msg);
  }
}

function handleNotesServiceGetProblemsByCategoryRequest<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: NotesServiceTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    GetProblemsByCategoryRequest,
    GetProblemsByCategoryResponse
  >[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleNotesServiceGetProblemsByCategoryJSON<T>(
        ctx,
        service,
        data,
        interceptors
      );
    case TwirpContentType.Protobuf:
      return handleNotesServiceGetProblemsByCategoryProtobuf<T>(
        ctx,
        service,
        data,
        interceptors
      );
    default:
      const msg = "unexpected Content-Type";
      throw new TwirpError(TwirpErrorCode.BadRoute, msg);
  }
}

function handleNotesServiceGetProblemByIdRequest<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: NotesServiceTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, GetProblemByIdRequest, GetProblemByIdResponse>[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleNotesServiceGetProblemByIdJSON<T>(
        ctx,
        service,
        data,
        interceptors
      );
    case TwirpContentType.Protobuf:
      return handleNotesServiceGetProblemByIdProtobuf<T>(
        ctx,
        service,
        data,
        interceptors
      );
    default:
      const msg = "unexpected Content-Type";
      throw new TwirpError(TwirpErrorCode.BadRoute, msg);
  }
}

function handleNotesServiceGetProblemNotesByIdRequest<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: NotesServiceTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    GetProblemNotesByIdRequest,
    GetProblemNotesByIdResponse
  >[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleNotesServiceGetProblemNotesByIdJSON<T>(
        ctx,
        service,
        data,
        interceptors
      );
    case TwirpContentType.Protobuf:
      return handleNotesServiceGetProblemNotesByIdProtobuf<T>(
        ctx,
        service,
        data,
        interceptors
      );
    default:
      const msg = "unexpected Content-Type";
      throw new TwirpError(TwirpErrorCode.BadRoute, msg);
  }
}

function handleNotesServiceGetImplementationNotesByIdRequest<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: NotesServiceTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    GetImplementationNotesByIdRequest,
    GetImplementationNotesByIdResponse
  >[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleNotesServiceGetImplementationNotesByIdJSON<T>(
        ctx,
        service,
        data,
        interceptors
      );
    case TwirpContentType.Protobuf:
      return handleNotesServiceGetImplementationNotesByIdProtobuf<T>(
        ctx,
        service,
        data,
        interceptors
      );
    default:
      const msg = "unexpected Content-Type";
      throw new TwirpError(TwirpErrorCode.BadRoute, msg);
  }
}

function handleNotesServiceCreateOrUpdateProblemDetailsRequest<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: NotesServiceTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    CreateOrUpdateProblemDetailsRequest,
    CreateOrUpdateProblemDetailsResponse
  >[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleNotesServiceCreateOrUpdateProblemDetailsJSON<T>(
        ctx,
        service,
        data,
        interceptors
      );
    case TwirpContentType.Protobuf:
      return handleNotesServiceCreateOrUpdateProblemDetailsProtobuf<T>(
        ctx,
        service,
        data,
        interceptors
      );
    default:
      const msg = "unexpected Content-Type";
      throw new TwirpError(TwirpErrorCode.BadRoute, msg);
  }
}

function handleNotesServiceCreateOrUpdateProblemNotesRequest<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: NotesServiceTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    CreateOrUpdateProblemNotesRequest,
    CreateOrUpdateProblemNotesResponse
  >[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleNotesServiceCreateOrUpdateProblemNotesJSON<T>(
        ctx,
        service,
        data,
        interceptors
      );
    case TwirpContentType.Protobuf:
      return handleNotesServiceCreateOrUpdateProblemNotesProtobuf<T>(
        ctx,
        service,
        data,
        interceptors
      );
    default:
      const msg = "unexpected Content-Type";
      throw new TwirpError(TwirpErrorCode.BadRoute, msg);
  }
}

function handleNotesServiceGetAlgorithmCategoriesRequest<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: NotesServiceTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    GetAlgorithmCategoriesRequest,
    GetAlgorithmCategoriesResponse
  >[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleNotesServiceGetAlgorithmCategoriesJSON<T>(
        ctx,
        service,
        data,
        interceptors
      );
    case TwirpContentType.Protobuf:
      return handleNotesServiceGetAlgorithmCategoriesProtobuf<T>(
        ctx,
        service,
        data,
        interceptors
      );
    default:
      const msg = "unexpected Content-Type";
      throw new TwirpError(TwirpErrorCode.BadRoute, msg);
  }
}

function handleNotesServiceGetAlgorithmsByCategoryRequest<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: NotesServiceTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    GetAlgorithmsByCategoryRequest,
    GetAlgorithmsByCategoryResponse
  >[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleNotesServiceGetAlgorithmsByCategoryJSON<T>(
        ctx,
        service,
        data,
        interceptors
      );
    case TwirpContentType.Protobuf:
      return handleNotesServiceGetAlgorithmsByCategoryProtobuf<T>(
        ctx,
        service,
        data,
        interceptors
      );
    default:
      const msg = "unexpected Content-Type";
      throw new TwirpError(TwirpErrorCode.BadRoute, msg);
  }
}

function handleNotesServiceCreateOrUpdateAlgorithmRequest<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: NotesServiceTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    CreateOrUpdateAlgorithmRequest,
    CreateOrUpdateAlgorithmResponse
  >[]
): Promise<string | Uint8Array> {
  switch (ctx.contentType) {
    case TwirpContentType.JSON:
      return handleNotesServiceCreateOrUpdateAlgorithmJSON<T>(
        ctx,
        service,
        data,
        interceptors
      );
    case TwirpContentType.Protobuf:
      return handleNotesServiceCreateOrUpdateAlgorithmProtobuf<T>(
        ctx,
        service,
        data,
        interceptors
      );
    default:
      const msg = "unexpected Content-Type";
      throw new TwirpError(TwirpErrorCode.BadRoute, msg);
  }
}
async function handleNotesServiceGetProblemCategoriesJSON<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: NotesServiceTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    GetProblemCategoriesRequest,
    GetProblemCategoriesResponse
  >[]
) {
  let request: GetProblemCategoriesRequest;
  let response: GetProblemCategoriesResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = GetProblemCategoriesRequest.fromJson(body, {
      ignoreUnknownFields: true,
    });
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the json request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      GetProblemCategoriesRequest,
      GetProblemCategoriesResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.GetProblemCategories(ctx, inputReq);
    });
  } else {
    response = await service.GetProblemCategories(ctx, request!);
  }

  return JSON.stringify(
    GetProblemCategoriesResponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}

async function handleNotesServiceGetProblemsByCategoryJSON<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: NotesServiceTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    GetProblemsByCategoryRequest,
    GetProblemsByCategoryResponse
  >[]
) {
  let request: GetProblemsByCategoryRequest;
  let response: GetProblemsByCategoryResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = GetProblemsByCategoryRequest.fromJson(body, {
      ignoreUnknownFields: true,
    });
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the json request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      GetProblemsByCategoryRequest,
      GetProblemsByCategoryResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.GetProblemsByCategory(ctx, inputReq);
    });
  } else {
    response = await service.GetProblemsByCategory(ctx, request!);
  }

  return JSON.stringify(
    GetProblemsByCategoryResponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}

async function handleNotesServiceGetProblemByIdJSON<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: NotesServiceTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, GetProblemByIdRequest, GetProblemByIdResponse>[]
) {
  let request: GetProblemByIdRequest;
  let response: GetProblemByIdResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = GetProblemByIdRequest.fromJson(body, {
      ignoreUnknownFields: true,
    });
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the json request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      GetProblemByIdRequest,
      GetProblemByIdResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.GetProblemById(ctx, inputReq);
    });
  } else {
    response = await service.GetProblemById(ctx, request!);
  }

  return JSON.stringify(
    GetProblemByIdResponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}

async function handleNotesServiceGetProblemNotesByIdJSON<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: NotesServiceTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    GetProblemNotesByIdRequest,
    GetProblemNotesByIdResponse
  >[]
) {
  let request: GetProblemNotesByIdRequest;
  let response: GetProblemNotesByIdResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = GetProblemNotesByIdRequest.fromJson(body, {
      ignoreUnknownFields: true,
    });
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the json request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      GetProblemNotesByIdRequest,
      GetProblemNotesByIdResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.GetProblemNotesById(ctx, inputReq);
    });
  } else {
    response = await service.GetProblemNotesById(ctx, request!);
  }

  return JSON.stringify(
    GetProblemNotesByIdResponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}

async function handleNotesServiceGetImplementationNotesByIdJSON<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: NotesServiceTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    GetImplementationNotesByIdRequest,
    GetImplementationNotesByIdResponse
  >[]
) {
  let request: GetImplementationNotesByIdRequest;
  let response: GetImplementationNotesByIdResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = GetImplementationNotesByIdRequest.fromJson(body, {
      ignoreUnknownFields: true,
    });
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the json request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      GetImplementationNotesByIdRequest,
      GetImplementationNotesByIdResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.GetImplementationNotesById(ctx, inputReq);
    });
  } else {
    response = await service.GetImplementationNotesById(ctx, request!);
  }

  return JSON.stringify(
    GetImplementationNotesByIdResponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}

async function handleNotesServiceCreateOrUpdateProblemDetailsJSON<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: NotesServiceTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    CreateOrUpdateProblemDetailsRequest,
    CreateOrUpdateProblemDetailsResponse
  >[]
) {
  let request: CreateOrUpdateProblemDetailsRequest;
  let response: CreateOrUpdateProblemDetailsResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = CreateOrUpdateProblemDetailsRequest.fromJson(body, {
      ignoreUnknownFields: true,
    });
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the json request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      CreateOrUpdateProblemDetailsRequest,
      CreateOrUpdateProblemDetailsResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.CreateOrUpdateProblemDetails(ctx, inputReq);
    });
  } else {
    response = await service.CreateOrUpdateProblemDetails(ctx, request!);
  }

  return JSON.stringify(
    CreateOrUpdateProblemDetailsResponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}

async function handleNotesServiceCreateOrUpdateProblemNotesJSON<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: NotesServiceTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    CreateOrUpdateProblemNotesRequest,
    CreateOrUpdateProblemNotesResponse
  >[]
) {
  let request: CreateOrUpdateProblemNotesRequest;
  let response: CreateOrUpdateProblemNotesResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = CreateOrUpdateProblemNotesRequest.fromJson(body, {
      ignoreUnknownFields: true,
    });
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the json request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      CreateOrUpdateProblemNotesRequest,
      CreateOrUpdateProblemNotesResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.CreateOrUpdateProblemNotes(ctx, inputReq);
    });
  } else {
    response = await service.CreateOrUpdateProblemNotes(ctx, request!);
  }

  return JSON.stringify(
    CreateOrUpdateProblemNotesResponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}

async function handleNotesServiceGetAlgorithmCategoriesJSON<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: NotesServiceTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    GetAlgorithmCategoriesRequest,
    GetAlgorithmCategoriesResponse
  >[]
) {
  let request: GetAlgorithmCategoriesRequest;
  let response: GetAlgorithmCategoriesResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = GetAlgorithmCategoriesRequest.fromJson(body, {
      ignoreUnknownFields: true,
    });
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the json request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      GetAlgorithmCategoriesRequest,
      GetAlgorithmCategoriesResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.GetAlgorithmCategories(ctx, inputReq);
    });
  } else {
    response = await service.GetAlgorithmCategories(ctx, request!);
  }

  return JSON.stringify(
    GetAlgorithmCategoriesResponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}

async function handleNotesServiceGetAlgorithmsByCategoryJSON<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: NotesServiceTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    GetAlgorithmsByCategoryRequest,
    GetAlgorithmsByCategoryResponse
  >[]
) {
  let request: GetAlgorithmsByCategoryRequest;
  let response: GetAlgorithmsByCategoryResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = GetAlgorithmsByCategoryRequest.fromJson(body, {
      ignoreUnknownFields: true,
    });
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the json request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      GetAlgorithmsByCategoryRequest,
      GetAlgorithmsByCategoryResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.GetAlgorithmsByCategory(ctx, inputReq);
    });
  } else {
    response = await service.GetAlgorithmsByCategory(ctx, request!);
  }

  return JSON.stringify(
    GetAlgorithmsByCategoryResponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}

async function handleNotesServiceCreateOrUpdateAlgorithmJSON<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: NotesServiceTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    CreateOrUpdateAlgorithmRequest,
    CreateOrUpdateAlgorithmResponse
  >[]
) {
  let request: CreateOrUpdateAlgorithmRequest;
  let response: CreateOrUpdateAlgorithmResponse;

  try {
    const body = JSON.parse(data.toString() || "{}");
    request = CreateOrUpdateAlgorithmRequest.fromJson(body, {
      ignoreUnknownFields: true,
    });
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the json request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      CreateOrUpdateAlgorithmRequest,
      CreateOrUpdateAlgorithmResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.CreateOrUpdateAlgorithm(ctx, inputReq);
    });
  } else {
    response = await service.CreateOrUpdateAlgorithm(ctx, request!);
  }

  return JSON.stringify(
    CreateOrUpdateAlgorithmResponse.toJson(response, {
      useProtoFieldName: true,
      emitDefaultValues: false,
    }) as string
  );
}
async function handleNotesServiceGetProblemCategoriesProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: NotesServiceTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    GetProblemCategoriesRequest,
    GetProblemCategoriesResponse
  >[]
) {
  let request: GetProblemCategoriesRequest;
  let response: GetProblemCategoriesResponse;

  try {
    request = GetProblemCategoriesRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      GetProblemCategoriesRequest,
      GetProblemCategoriesResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.GetProblemCategories(ctx, inputReq);
    });
  } else {
    response = await service.GetProblemCategories(ctx, request!);
  }

  return Buffer.from(GetProblemCategoriesResponse.toBinary(response));
}

async function handleNotesServiceGetProblemsByCategoryProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: NotesServiceTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    GetProblemsByCategoryRequest,
    GetProblemsByCategoryResponse
  >[]
) {
  let request: GetProblemsByCategoryRequest;
  let response: GetProblemsByCategoryResponse;

  try {
    request = GetProblemsByCategoryRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      GetProblemsByCategoryRequest,
      GetProblemsByCategoryResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.GetProblemsByCategory(ctx, inputReq);
    });
  } else {
    response = await service.GetProblemsByCategory(ctx, request!);
  }

  return Buffer.from(GetProblemsByCategoryResponse.toBinary(response));
}

async function handleNotesServiceGetProblemByIdProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: NotesServiceTwirp,
  data: Buffer,
  interceptors?: Interceptor<T, GetProblemByIdRequest, GetProblemByIdResponse>[]
) {
  let request: GetProblemByIdRequest;
  let response: GetProblemByIdResponse;

  try {
    request = GetProblemByIdRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      GetProblemByIdRequest,
      GetProblemByIdResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.GetProblemById(ctx, inputReq);
    });
  } else {
    response = await service.GetProblemById(ctx, request!);
  }

  return Buffer.from(GetProblemByIdResponse.toBinary(response));
}

async function handleNotesServiceGetProblemNotesByIdProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: NotesServiceTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    GetProblemNotesByIdRequest,
    GetProblemNotesByIdResponse
  >[]
) {
  let request: GetProblemNotesByIdRequest;
  let response: GetProblemNotesByIdResponse;

  try {
    request = GetProblemNotesByIdRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      GetProblemNotesByIdRequest,
      GetProblemNotesByIdResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.GetProblemNotesById(ctx, inputReq);
    });
  } else {
    response = await service.GetProblemNotesById(ctx, request!);
  }

  return Buffer.from(GetProblemNotesByIdResponse.toBinary(response));
}

async function handleNotesServiceGetImplementationNotesByIdProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: NotesServiceTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    GetImplementationNotesByIdRequest,
    GetImplementationNotesByIdResponse
  >[]
) {
  let request: GetImplementationNotesByIdRequest;
  let response: GetImplementationNotesByIdResponse;

  try {
    request = GetImplementationNotesByIdRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      GetImplementationNotesByIdRequest,
      GetImplementationNotesByIdResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.GetImplementationNotesById(ctx, inputReq);
    });
  } else {
    response = await service.GetImplementationNotesById(ctx, request!);
  }

  return Buffer.from(GetImplementationNotesByIdResponse.toBinary(response));
}

async function handleNotesServiceCreateOrUpdateProblemDetailsProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: NotesServiceTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    CreateOrUpdateProblemDetailsRequest,
    CreateOrUpdateProblemDetailsResponse
  >[]
) {
  let request: CreateOrUpdateProblemDetailsRequest;
  let response: CreateOrUpdateProblemDetailsResponse;

  try {
    request = CreateOrUpdateProblemDetailsRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      CreateOrUpdateProblemDetailsRequest,
      CreateOrUpdateProblemDetailsResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.CreateOrUpdateProblemDetails(ctx, inputReq);
    });
  } else {
    response = await service.CreateOrUpdateProblemDetails(ctx, request!);
  }

  return Buffer.from(CreateOrUpdateProblemDetailsResponse.toBinary(response));
}

async function handleNotesServiceCreateOrUpdateProblemNotesProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: NotesServiceTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    CreateOrUpdateProblemNotesRequest,
    CreateOrUpdateProblemNotesResponse
  >[]
) {
  let request: CreateOrUpdateProblemNotesRequest;
  let response: CreateOrUpdateProblemNotesResponse;

  try {
    request = CreateOrUpdateProblemNotesRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      CreateOrUpdateProblemNotesRequest,
      CreateOrUpdateProblemNotesResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.CreateOrUpdateProblemNotes(ctx, inputReq);
    });
  } else {
    response = await service.CreateOrUpdateProblemNotes(ctx, request!);
  }

  return Buffer.from(CreateOrUpdateProblemNotesResponse.toBinary(response));
}

async function handleNotesServiceGetAlgorithmCategoriesProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: NotesServiceTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    GetAlgorithmCategoriesRequest,
    GetAlgorithmCategoriesResponse
  >[]
) {
  let request: GetAlgorithmCategoriesRequest;
  let response: GetAlgorithmCategoriesResponse;

  try {
    request = GetAlgorithmCategoriesRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      GetAlgorithmCategoriesRequest,
      GetAlgorithmCategoriesResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.GetAlgorithmCategories(ctx, inputReq);
    });
  } else {
    response = await service.GetAlgorithmCategories(ctx, request!);
  }

  return Buffer.from(GetAlgorithmCategoriesResponse.toBinary(response));
}

async function handleNotesServiceGetAlgorithmsByCategoryProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: NotesServiceTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    GetAlgorithmsByCategoryRequest,
    GetAlgorithmsByCategoryResponse
  >[]
) {
  let request: GetAlgorithmsByCategoryRequest;
  let response: GetAlgorithmsByCategoryResponse;

  try {
    request = GetAlgorithmsByCategoryRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      GetAlgorithmsByCategoryRequest,
      GetAlgorithmsByCategoryResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.GetAlgorithmsByCategory(ctx, inputReq);
    });
  } else {
    response = await service.GetAlgorithmsByCategory(ctx, request!);
  }

  return Buffer.from(GetAlgorithmsByCategoryResponse.toBinary(response));
}

async function handleNotesServiceCreateOrUpdateAlgorithmProtobuf<
  T extends TwirpContext = TwirpContext
>(
  ctx: T,
  service: NotesServiceTwirp,
  data: Buffer,
  interceptors?: Interceptor<
    T,
    CreateOrUpdateAlgorithmRequest,
    CreateOrUpdateAlgorithmResponse
  >[]
) {
  let request: CreateOrUpdateAlgorithmRequest;
  let response: CreateOrUpdateAlgorithmResponse;

  try {
    request = CreateOrUpdateAlgorithmRequest.fromBinary(data);
  } catch (e) {
    if (e instanceof Error) {
      const msg = "the protobuf request could not be decoded";
      throw new TwirpError(TwirpErrorCode.Malformed, msg).withCause(e, true);
    }
  }

  if (interceptors && interceptors.length > 0) {
    const interceptor = chainInterceptors(...interceptors) as Interceptor<
      T,
      CreateOrUpdateAlgorithmRequest,
      CreateOrUpdateAlgorithmResponse
    >;
    response = await interceptor(ctx, request!, (ctx, inputReq) => {
      return service.CreateOrUpdateAlgorithm(ctx, inputReq);
    });
  } else {
    response = await service.CreateOrUpdateAlgorithm(ctx, request!);
  }

  return Buffer.from(CreateOrUpdateAlgorithmResponse.toBinary(response));
}
