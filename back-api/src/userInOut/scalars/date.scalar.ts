import { CustomScalar, Scalar } from '@nestjs/graphql'
import { Kind, ValueNode } from 'graphql'

@Scalar('DateUser', (type) => Date)
export class DateScalarUser implements CustomScalar<number, Date> {
	description = 'Date custom scalar type'

	parseValue(value: number): Date {
		return new Date(value) // value from the client
	}

	serialize(value: Date): number {
		return value.getTime() // value sent to the client
	}

	parseLiteral(ast: ValueNode): Date {
		if (ast.kind === Kind.INT) {
			return new Date(ast.value)
		}
		return null
	}
}
