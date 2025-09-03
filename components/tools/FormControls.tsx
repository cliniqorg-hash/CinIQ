'use client'

import { useLang } from '../LangProvider'
import { messages } from '../../lib/i18n'

type BaseProps = {
	label?: string | React.ReactNode
	children?: React.ReactNode
	className?: string
}

export function Field({ label, children, className }: BaseProps) {
	return (
		<label className={`block ${className ?? ''}`} dir="rtl">
			{label ? <span className="text-sm font-medium text-gray-700 mb-2 block">{label}</span> : null}
			{children}
		</label>
	)
}

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & BaseProps

export function TextInput({ label, className, ...rest }: InputProps) {
	return (
		<Field label={label} className={className}>
			<input
				{...rest}
				className={`w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 hover:border-gray-400`}
			/>
		</Field>
	)
}

export function NumberInput(props: InputProps) {
	return <TextInput type="number" {...props} />
}

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & BaseProps

export function Select({ label, className, children, ...rest }: SelectProps) {
	return (
		<Field label={label} className={className}>
			<select
				{...rest}
				className={`w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 hover:border-gray-400`}
			>
				{children}
			</select>
		</Field>
	)
}

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & { label: string }

export function Checkbox({ label, ...rest }: CheckboxProps) {
	return (
		<label className="flex items-center gap-3 select-none cursor-pointer">
			<input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 focus:ring-2" {...rest} />
			<span className="text-sm font-medium text-gray-700">{label}</span>
		</label>
	)
}

export function T({ k }: { k: string }) {
	const { locale } = useLang()
	return <>{messages[locale][k] ?? k}</>
}


