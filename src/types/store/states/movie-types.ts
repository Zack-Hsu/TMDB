import { z } from 'zod';

export const MovieResultSchema = z.object({
    backdrop_path: z.union([z.string(), z.null()]),
    id: z.number(),
    title: z.string(),
    original_title: z.string(),
    overview: z.string(),
    poster_path: z.union([z.string(), z.null()]),
    media_type: z.string().optional(),
    adult: z.boolean(),
    original_language: z.string(),
    genre_ids: z.array(z.number()),
    popularity: z.number(),
    release_date: z.string(),
    video: z.boolean(),
    vote_average: z.number(),
    vote_count: z.number(),
});

export const MovieSchema = z.object({
    page: z.number(),
    results: z.array(MovieResultSchema),
    total_pages: z.number(),
    total_results: z.number(),
});
export const MovieStatus = z.object({
    success: z.boolean(),
    errMessage: z.string(),
    noticeMessage: z.string(),
})
export type Movie = z.infer<typeof MovieSchema>
export type MovieResult = z.infer<typeof MovieResultSchema>
export type MovieStatus = z.infer<typeof MovieStatus>

export const MoviePreprocessedSchema = z.preprocess((data) => {
    if (Array.isArray(data)) {
        return data[0];
    }
    return data;
}, MovieSchema);

/** Credits */
export const CastSchema = z.object({
    adult: z.boolean(),
    gender: z.number(),
    id: z.number(),
    known_for_department: z.string(),
    name: z.string(),
    original_name: z.string(),
    popularity: z.number(),
    profile_path: z.string(),
    cast_id: z.number(),
    character: z.string(),
    credit_id: z.string(),
    order: z.number(),
    cast_img: z.string(),
});

export const CrewSchema = z.object({
    adult: z.boolean(),
    gender: z.number(),
    id: z.number(),
    known_for_department: z.string(),
    name: z.string(),
    original_name: z.string(),
    popularity: z.number(),
    profile_path: z.string(),
    credit_id: z.string(),
    department: z.string(),
    job: z.string(),
});

export const MovieCreditsSchema = z.object({
    id: z.number(),
    cast: z.array(CastSchema),
    crew: z.array(CrewSchema),
});

export type MovieCredits = z.infer<typeof MovieCreditsSchema>
export type Cast = z.infer<typeof CastSchema>
export type Crew = z.infer<typeof CrewSchema>
