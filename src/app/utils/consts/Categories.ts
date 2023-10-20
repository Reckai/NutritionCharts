export const categories = ['Foundation', 'Survey (FNDDS)', 'SR Legacy','Branded',  'Experimental'] as const
export type Category = typeof categories[number]
