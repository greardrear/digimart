import { Listing } from "./entitites/listing.entity.js";

export interface FilteredListings {
    items: Listing[];
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
}