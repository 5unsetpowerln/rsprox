import { EditorView } from '@codemirror/view';
import { type Extension } from '@codemirror/state';
import { HighlightStyle, type TagStyle, syntaxHighlighting } from '@codemirror/language';
import { tags as t } from '@lezer/highlight';

interface Options {
	/**
	 * Theme variant. Determines which styles CodeMirror will apply by default.
	 */
	variant: Variant;

	/**
	 * Settings to customize the look of the editor, like background, gutter, selection and others.
	 */
	settings: Settings;

	/**
	 * Syntax highlighting styles.
	 */
	styles: TagStyle[];
}

type Variant = 'light' | 'dark';

interface Settings {
	/**
	 * Editor background.
	 */
	background: string;

	/**
	 * Default text color.
	 */
	foreground: string;

	/**
	 * Caret color.
	 */
	caret: string;

	/**
	 * Selection background.
	 */
	selection: string;

	/**
	 * Background of highlighted lines.
	 */
	lineHighlight: string;

	/**
	 * Gutter background.
	 */
	gutterBackground: string;

	/**
	 * Text color inside gutter.
	 */
	gutterForeground: string;
}

const createTheme = ({ variant, settings, styles }: Options): Extension => {
	const theme = EditorView.theme(
		{
			// eslint-disable-next-line @typescript-eslint/naming-convention
			'&': {
				backgroundColor: settings.background,
				color: settings.foreground
			},
			'.cm-content': {
				caretColor: settings.caret
			},
			'.cm-cursor, .cm-dropCursor': {
				borderLeftColor: settings.caret
			},
			'&.cm-focused .cm-selectionBackgroundm .cm-selectionBackground, .cm-content ::selection': {
				backgroundColor: settings.selection
			},
			'.cm-activeLine': {
				backgroundColor: settings.lineHighlight
			},
			'.cm-gutters': {
				backgroundColor: settings.gutterBackground,
				color: settings.gutterForeground
			},
			'.cm-activeLineGutter': {
				backgroundColor: settings.lineHighlight
			}
		},
		{
			dark: variant === 'dark'
		}
	);

	const highlightStyle = HighlightStyle.define(styles);
	const extension = [theme, syntaxHighlighting(highlightStyle)];

	return extension;
};

export const theme = createTheme({
	variant: 'dark',
	settings: {
		background: '#15191E33',
		foreground: '#EEF2F7',
		caret: '#C4C4C4',
		selection: '#90B2D557',
		gutterBackground: '#15191E00',
		gutterForeground: '#aaaaaa95',
		lineHighlight: '#57575755'
	},
	styles: [
		{
			tag: t.comment,
			color: '#6E6E6E'
		},
		{
			tag: [t.string, t.regexp, t.special(t.brace)],
			color: '#5C81B3'
		},
		{
			tag: t.number,
			color: '#C1E1B8'
		},
		{
			tag: t.bool,
			color: '#53667D'
		},
		{
			tag: [t.definitionKeyword, t.modifier, t.function(t.propertyName)],
			color: '#A3D295',
			fontWeight: 'bold'
		},
		{
			tag: [t.keyword, t.moduleKeyword, t.operatorKeyword, t.operator],
			color: '#697A8E',
			fontWeight: 'bold'
		},
		{
			tag: [t.variableName, t.attributeName],
			color: '#708E67'
		},
		{
			tag: [t.function(t.variableName), t.definition(t.propertyName), t.derefOperator],
			color: '#fff'
		},
		{
			tag: t.tagName,
			color: '#A3D295'
		}
	]
});
