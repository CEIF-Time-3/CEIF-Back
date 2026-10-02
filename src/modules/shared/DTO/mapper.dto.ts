export interface BaseMapper<TEntity, TDto> {
  toDto(entity: TEntity): TDto;
  toEntity(dto: TDto): TEntity;
}
