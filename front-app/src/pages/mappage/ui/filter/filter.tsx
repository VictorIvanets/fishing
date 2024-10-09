import { useEffect, useState } from 'react'

interface FilterProps {
	notViewAll: () => void
	setFilterByValue: React.Dispatch<React.SetStateAction<string | null>>
}

function Filter({ notViewAll, setFilterByValue }: FilterProps) {
	const [filterValue, setFilterValue] = useState<string | null>(null)
	///
	function filter(e: React.ChangeEvent<HTMLInputElement>) {
		setFilterValue(e.target.value)
	}

	useEffect(() => {
		setFilterByValue(filterValue)
	}, [filterValue, setFilterByValue])

	return (
		<div className="filterfish">
			<form className="filterfish__filter">
				<div className="filterfish__filter__checkboxitem">
					<input
						onChange={(e) => filter(e)}
						type="radio"
						id="lucian"
						name="filter"
						value="карась"
					/>
					<label htmlFor="lucian">Карась</label>
				</div>

				<div className="filterfish__filter__checkboxitem">
					<input
						onChange={(e) => filter(e)}
						type="radio"
						id="karp"
						name="filter"
						value="карп"
					/>
					<label htmlFor="karp">Карп</label>
				</div>

				<div className="filterfish__filter__checkboxitem">
					<input
						onChange={(e) => filter(e)}
						type="radio"
						id="lyasch"
						name="filter"
						value="лящ"
					/>
					<label htmlFor="lyasch">Лящ</label>
				</div>
				<div className="filterfish__filter__checkboxitem">
					<input
						onChange={(e) => filter(e)}
						type="radio"
						id="lyn"
						name="filter"
						value="лин"
					/>
					<label htmlFor="lyn">Линок</label>
				</div>
				<div className="filterfish__filter__checkboxitem">
					<input
						onChange={(e) => filter(e)}
						type="radio"
						id="pike"
						name="filter"
						value="щука"
					/>
					<label htmlFor="pike">Щука</label>
				</div>
				<div className="filterfish__filter__checkboxitem">
					<input
						onChange={(e) => filter(e)}
						type="radio"
						id="sudak"
						name="filter"
						value="судак"
					/>
					<label htmlFor="sudak">Судак</label>
				</div>
			</form>
			<button
				onClick={() => {
					notViewAll()
				}}
				className="filterfish__btn"
			>
				назад
			</button>
		</div>
	)
}

export default Filter
