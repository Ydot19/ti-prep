// @generated by protobuf-ts 2.2.3-alpha.1 with parameter generate_dependencies
// @generated from protobuf file "rpc/v1/notes.proto" (package "rpc", syntax proto3)
// tslint:disable
import type { RpcTransport } from "@protobuf-ts/runtime-rpc";
import type { ServiceInfo } from "@protobuf-ts/runtime-rpc";
import { NotesService } from "./notes";
import type { CreateOrUpdateAlgorithmResponse } from "./notes";
import type { CreateOrUpdateAlgorithmRequest } from "./notes";
import type { GetAlgorithmsByCategoryResponse } from "./notes";
import type { GetAlgorithmsByCategoryRequest } from "./notes";
import type { GetAlgorithmCategoriesResponse } from "./notes";
import type { GetAlgorithmCategoriesRequest } from "./notes";
import type { CreateOrUpdateProblemNotesResponse } from "./notes";
import type { CreateOrUpdateProblemNotesRequest } from "./notes";
import type { CreateOrUpdateProblemDetailsResponse } from "./notes";
import type { CreateOrUpdateProblemDetailsRequest } from "./notes";
import type { GetImplementationNotesByIdResponse } from "./notes";
import type { GetImplementationNotesByIdRequest } from "./notes";
import type { GetProblemNotesByIdResponse } from "./notes";
import type { GetProblemNotesByIdRequest } from "./notes";
import type { GetProblemByIdResponse } from "./notes";
import type { GetProblemByIdRequest } from "./notes";
import type { GetProblemsByCategoryResponse } from "./notes";
import type { GetProblemsByCategoryRequest } from "./notes";
import { stackIntercept } from "@protobuf-ts/runtime-rpc";
import type { GetProblemCategoriesResponse } from "./notes";
import type { GetProblemCategoriesRequest } from "./notes";
import type { UnaryCall } from "@protobuf-ts/runtime-rpc";
import type { RpcOptions } from "@protobuf-ts/runtime-rpc";
/**
 * @generated from protobuf service rpc.NotesService
 */
export interface INotesServiceClient {
    /**
     * @generated from protobuf rpc: GetProblemCategories(rpc.GetProblemCategoriesRequest) returns (rpc.GetProblemCategoriesResponse);
     */
    getProblemCategories(input: GetProblemCategoriesRequest, options?: RpcOptions): UnaryCall<GetProblemCategoriesRequest, GetProblemCategoriesResponse>;
    /**
     * @generated from protobuf rpc: GetProblemsByCategory(rpc.GetProblemsByCategoryRequest) returns (rpc.GetProblemsByCategoryResponse);
     */
    getProblemsByCategory(input: GetProblemsByCategoryRequest, options?: RpcOptions): UnaryCall<GetProblemsByCategoryRequest, GetProblemsByCategoryResponse>;
    /**
     * @generated from protobuf rpc: GetProblemById(rpc.GetProblemByIdRequest) returns (rpc.GetProblemByIdResponse);
     */
    getProblemById(input: GetProblemByIdRequest, options?: RpcOptions): UnaryCall<GetProblemByIdRequest, GetProblemByIdResponse>;
    /**
     * @generated from protobuf rpc: GetProblemNotesById(rpc.GetProblemNotesByIdRequest) returns (rpc.GetProblemNotesByIdResponse);
     */
    getProblemNotesById(input: GetProblemNotesByIdRequest, options?: RpcOptions): UnaryCall<GetProblemNotesByIdRequest, GetProblemNotesByIdResponse>;
    /**
     * @generated from protobuf rpc: GetImplementationNotesById(rpc.GetImplementationNotesByIdRequest) returns (rpc.GetImplementationNotesByIdResponse);
     */
    getImplementationNotesById(input: GetImplementationNotesByIdRequest, options?: RpcOptions): UnaryCall<GetImplementationNotesByIdRequest, GetImplementationNotesByIdResponse>;
    /**
     * @generated from protobuf rpc: CreateOrUpdateProblemDetails(rpc.CreateOrUpdateProblemDetailsRequest) returns (rpc.CreateOrUpdateProblemDetailsResponse);
     */
    createOrUpdateProblemDetails(input: CreateOrUpdateProblemDetailsRequest, options?: RpcOptions): UnaryCall<CreateOrUpdateProblemDetailsRequest, CreateOrUpdateProblemDetailsResponse>;
    /**
     * @generated from protobuf rpc: CreateOrUpdateProblemNotes(rpc.CreateOrUpdateProblemNotesRequest) returns (rpc.CreateOrUpdateProblemNotesResponse);
     */
    createOrUpdateProblemNotes(input: CreateOrUpdateProblemNotesRequest, options?: RpcOptions): UnaryCall<CreateOrUpdateProblemNotesRequest, CreateOrUpdateProblemNotesResponse>;
    /**
     * @generated from protobuf rpc: GetAlgorithmCategories(rpc.GetAlgorithmCategoriesRequest) returns (rpc.GetAlgorithmCategoriesResponse);
     */
    getAlgorithmCategories(input: GetAlgorithmCategoriesRequest, options?: RpcOptions): UnaryCall<GetAlgorithmCategoriesRequest, GetAlgorithmCategoriesResponse>;
    /**
     * @generated from protobuf rpc: GetAlgorithmsByCategory(rpc.GetAlgorithmsByCategoryRequest) returns (rpc.GetAlgorithmsByCategoryResponse);
     */
    getAlgorithmsByCategory(input: GetAlgorithmsByCategoryRequest, options?: RpcOptions): UnaryCall<GetAlgorithmsByCategoryRequest, GetAlgorithmsByCategoryResponse>;
    /**
     * @generated from protobuf rpc: CreateOrUpdateAlgorithm(rpc.CreateOrUpdateAlgorithmRequest) returns (rpc.CreateOrUpdateAlgorithmResponse);
     */
    createOrUpdateAlgorithm(input: CreateOrUpdateAlgorithmRequest, options?: RpcOptions): UnaryCall<CreateOrUpdateAlgorithmRequest, CreateOrUpdateAlgorithmResponse>;
}
/**
 * @generated from protobuf service rpc.NotesService
 */
export class NotesServiceClient implements INotesServiceClient, ServiceInfo {
    typeName = NotesService.typeName;
    methods = NotesService.methods;
    options = NotesService.options;
    constructor(private readonly _transport: RpcTransport) {
    }
    /**
     * @generated from protobuf rpc: GetProblemCategories(rpc.GetProblemCategoriesRequest) returns (rpc.GetProblemCategoriesResponse);
     */
    getProblemCategories(input: GetProblemCategoriesRequest, options?: RpcOptions): UnaryCall<GetProblemCategoriesRequest, GetProblemCategoriesResponse> {
        const method = this.methods[0], opt = this._transport.mergeOptions(options);
        return stackIntercept<GetProblemCategoriesRequest, GetProblemCategoriesResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: GetProblemsByCategory(rpc.GetProblemsByCategoryRequest) returns (rpc.GetProblemsByCategoryResponse);
     */
    getProblemsByCategory(input: GetProblemsByCategoryRequest, options?: RpcOptions): UnaryCall<GetProblemsByCategoryRequest, GetProblemsByCategoryResponse> {
        const method = this.methods[1], opt = this._transport.mergeOptions(options);
        return stackIntercept<GetProblemsByCategoryRequest, GetProblemsByCategoryResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: GetProblemById(rpc.GetProblemByIdRequest) returns (rpc.GetProblemByIdResponse);
     */
    getProblemById(input: GetProblemByIdRequest, options?: RpcOptions): UnaryCall<GetProblemByIdRequest, GetProblemByIdResponse> {
        const method = this.methods[2], opt = this._transport.mergeOptions(options);
        return stackIntercept<GetProblemByIdRequest, GetProblemByIdResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: GetProblemNotesById(rpc.GetProblemNotesByIdRequest) returns (rpc.GetProblemNotesByIdResponse);
     */
    getProblemNotesById(input: GetProblemNotesByIdRequest, options?: RpcOptions): UnaryCall<GetProblemNotesByIdRequest, GetProblemNotesByIdResponse> {
        const method = this.methods[3], opt = this._transport.mergeOptions(options);
        return stackIntercept<GetProblemNotesByIdRequest, GetProblemNotesByIdResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: GetImplementationNotesById(rpc.GetImplementationNotesByIdRequest) returns (rpc.GetImplementationNotesByIdResponse);
     */
    getImplementationNotesById(input: GetImplementationNotesByIdRequest, options?: RpcOptions): UnaryCall<GetImplementationNotesByIdRequest, GetImplementationNotesByIdResponse> {
        const method = this.methods[4], opt = this._transport.mergeOptions(options);
        return stackIntercept<GetImplementationNotesByIdRequest, GetImplementationNotesByIdResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: CreateOrUpdateProblemDetails(rpc.CreateOrUpdateProblemDetailsRequest) returns (rpc.CreateOrUpdateProblemDetailsResponse);
     */
    createOrUpdateProblemDetails(input: CreateOrUpdateProblemDetailsRequest, options?: RpcOptions): UnaryCall<CreateOrUpdateProblemDetailsRequest, CreateOrUpdateProblemDetailsResponse> {
        const method = this.methods[5], opt = this._transport.mergeOptions(options);
        return stackIntercept<CreateOrUpdateProblemDetailsRequest, CreateOrUpdateProblemDetailsResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: CreateOrUpdateProblemNotes(rpc.CreateOrUpdateProblemNotesRequest) returns (rpc.CreateOrUpdateProblemNotesResponse);
     */
    createOrUpdateProblemNotes(input: CreateOrUpdateProblemNotesRequest, options?: RpcOptions): UnaryCall<CreateOrUpdateProblemNotesRequest, CreateOrUpdateProblemNotesResponse> {
        const method = this.methods[6], opt = this._transport.mergeOptions(options);
        return stackIntercept<CreateOrUpdateProblemNotesRequest, CreateOrUpdateProblemNotesResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: GetAlgorithmCategories(rpc.GetAlgorithmCategoriesRequest) returns (rpc.GetAlgorithmCategoriesResponse);
     */
    getAlgorithmCategories(input: GetAlgorithmCategoriesRequest, options?: RpcOptions): UnaryCall<GetAlgorithmCategoriesRequest, GetAlgorithmCategoriesResponse> {
        const method = this.methods[7], opt = this._transport.mergeOptions(options);
        return stackIntercept<GetAlgorithmCategoriesRequest, GetAlgorithmCategoriesResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: GetAlgorithmsByCategory(rpc.GetAlgorithmsByCategoryRequest) returns (rpc.GetAlgorithmsByCategoryResponse);
     */
    getAlgorithmsByCategory(input: GetAlgorithmsByCategoryRequest, options?: RpcOptions): UnaryCall<GetAlgorithmsByCategoryRequest, GetAlgorithmsByCategoryResponse> {
        const method = this.methods[8], opt = this._transport.mergeOptions(options);
        return stackIntercept<GetAlgorithmsByCategoryRequest, GetAlgorithmsByCategoryResponse>("unary", this._transport, method, opt, input);
    }
    /**
     * @generated from protobuf rpc: CreateOrUpdateAlgorithm(rpc.CreateOrUpdateAlgorithmRequest) returns (rpc.CreateOrUpdateAlgorithmResponse);
     */
    createOrUpdateAlgorithm(input: CreateOrUpdateAlgorithmRequest, options?: RpcOptions): UnaryCall<CreateOrUpdateAlgorithmRequest, CreateOrUpdateAlgorithmResponse> {
        const method = this.methods[9], opt = this._transport.mergeOptions(options);
        return stackIntercept<CreateOrUpdateAlgorithmRequest, CreateOrUpdateAlgorithmResponse>("unary", this._transport, method, opt, input);
    }
}