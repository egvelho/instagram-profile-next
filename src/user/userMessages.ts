export const userMessages = {
  min: (field: string, length: number) =>
    `O campo "${field}" precisa ter pelo menos ${length} letras.`,
  max: (field: string, length: number) =>
    `O campo "${field}" deve ter até ${length} letras.`,
};
