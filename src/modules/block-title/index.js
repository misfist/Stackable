import { __, sprintf } from '@wordpress/i18n'
import { addFilter, doAction, removeFilter } from '@wordpress/hooks'
import {
	AdvancedRangeControl,
	AlignButtonsControl,
	ColorPaletteControl,
	HeadingButtonsControl,
	PanelAdvancedSettings,
	ResponsiveControl,
	TypographyControlHelper,
} from '@stackable/components'
import {
	createResponsiveAttributeNames,
	createResponsiveAttributes,
	createTypographyAttributeNames,
	createTypographyAttributes,
	createTypographyStyles,
	descriptionPlaceholder,
	whiteIfDark,
} from '@stackable/util'
import deepmerge from 'deepmerge'
import { Fragment } from '@wordpress/element'
import { RichText } from '@wordpress/editor'

const addInspectorPanel = ( output, props ) => {
	// console.log('HAHAHA')
	const { setAttributes } = props
	const {
		showBlockTitle = false,
		blockTitleTag = '',
		blockTitleColor = '',
		showBlockDescription = false,
		blockDescriptionColor = '',
	} = props.attributes
	return (
		<Fragment>
			{ output }
			<PanelAdvancedSettings
				title={ __( 'Block Title' ) }
				className="ugb-panel-block-title-module"
				checked={ showBlockTitle }
				onChange={ showBlockTitle => setAttributes( { showBlockTitle } ) }
				toggleOnSetAttributes={ [
					...createTypographyAttributeNames( 'blockTitle%s' ),
					'blockTitleTag',
					'blockTitleColor',
					...createResponsiveAttributeNames( 'blockTitle%sAlign' ),
				] }
				toggleAttributeName="showBlockTitle"
			>
				<TypographyControlHelper
					attrNameTemplate="blockTitle%s"
					setAttributes={ setAttributes }
					blockAttributes={ props.attributes }
				/>
				<HeadingButtonsControl
					label={ __( 'Title HTML Tag' ) }
					value={ blockTitleTag || 'h2' }
					onChange={ blockTitleTag => setAttributes( { blockTitleTag } ) }
				/>
				<ColorPaletteControl
					value={ blockTitleColor }
					onChange={ blockTitleColor => setAttributes( { blockTitleColor } ) }
					label={ __( 'Title Color' ) }
				/>
				<ResponsiveControl
					attrNameTemplate="BlockTitle%sAlign"
					setAttributes={ setAttributes }
					blockAttributes={ props.attributes }
				>
					<AlignButtonsControl label={ __( 'Align' ) } />
				</ResponsiveControl>
			</PanelAdvancedSettings>
			<PanelAdvancedSettings
				title={ __( 'Block Description' ) }
				checked={ showBlockDescription }
				onChange={ showBlockDescription => setAttributes( { showBlockDescription } ) }
				toggleOnSetAttributes={ [
					...createTypographyAttributeNames( 'blockDescription%s' ),
					'blockDescriptionTag',
					'blockDescriptionColor',
					...createResponsiveAttributeNames( 'blockDescription%sAlign' ),
				] }
				toggleAttributeName="showBlockDescription"
			>
				<TypographyControlHelper
					attrNameTemplate="blockDescription%s"
					setAttributes={ setAttributes }
					blockAttributes={ props.attributes }
				/>
				<ColorPaletteControl
					value={ blockDescriptionColor }
					onChange={ blockDescriptionColor => setAttributes( { blockDescriptionColor } ) }
					label={ __( 'Description Color' ) }
				/>
				<ResponsiveControl
					attrNameTemplate="BlockDescription%sAlign"
					setAttributes={ setAttributes }
					blockAttributes={ props.attributes }
				>
					<AlignButtonsControl label={ __( 'Align' ) } />
				</ResponsiveControl>
			</PanelAdvancedSettings>
		</Fragment>
	)
}

const addAttributes = attributes => {
	return {
		...attributes,
		showBlockTitle: {
			type: 'boolean',
			default: false,
		},
		blockTitle: {
			source: 'html',
			selector: '.ugb-block-title',
			default: __( 'Title for This Block' ),
		},
		...createResponsiveAttributes( 'blockTitle%sBottomMargin', {
			type: 'number',
			default: '',
		} ),
		...createTypographyAttributes( 'blockTitle%s' ),
		...createResponsiveAttributes( 'blockTitle%sAlign', {
			type: 'string',
			default: '',
		} ),
		blockTitleColor: {
			type: 'string',
			default: '',
		},
		blockTitleTag: {
			type: 'string',
			default: '',
		},

		showBlockDescription: {
			type: 'boolean',
			default: false,
		},
		blockDescription: {
			source: 'html',
			selector: '.ugb-block-description',
			default: descriptionPlaceholder(),
		},
		...createResponsiveAttributes( 'blockDescription%sBottomMargin', {
			type: 'number',
			default: '',
		} ),
		...createTypographyAttributes( 'blockDescription%s' ),
		...createResponsiveAttributes( 'blockDescription%sAlign', {
			type: 'string',
			default: '',
		} ),
		blockDescriptionColor: {
			type: 'string',
			default: '',
		},
	}
}

const addTitleEditOutput = ( output, design, props ) => {
	const { setAttributes } = props
	const {
		showBlockTitle = false,
		blockTitle = '',
		blockTitleTag = '',
		showBlockDescription = false,
		blockDescription = '',
	} = props.attributes

	return (
		<Fragment>
			{ output }
			{ showBlockTitle && (
				<RichText
					tagName={ blockTitleTag || 'h2' }
					value={ blockTitle }
					className="ugb-block-title"
					onChange={ blockTitle => setAttributes( { blockTitle } ) }
					placeholder={ __( 'Title for This Block' ) }
					keepPlaceholderOnFocus
				/>
			) }
			{ showBlockDescription && (
				<RichText
					tagName="p"
					value={ blockDescription }
					className="ugb-block-description"
					onChange={ blockDescription => setAttributes( { blockDescription } ) }
					placeholder={ descriptionPlaceholder() }
					keepPlaceholderOnFocus
				/>
			) }
		</Fragment>
	)
}

const addTitleSpacing = ( output, props ) => {
	const { setAttributes } = props
	const {
		showBlockTitle = false,
		showBlockDescription = false,
	} = props.attributes

	return (
		<Fragment>
			{ output }
			{ showBlockTitle && (
				<ResponsiveControl
					attrNameTemplate="blockTitle%sBottomMargin"
					setAttributes={ setAttributes }
					blockAttributes={ props.attributes }
				>
					<AdvancedRangeControl
						label={ __( 'Block Title' ) }
						min={ -50 }
						max={ 100 }
						allowReset={ true }
					/>
				</ResponsiveControl>
			) }
			{ showBlockDescription && (
				<ResponsiveControl
					attrNameTemplate="blockDescription%sBottomMargin"
					setAttributes={ setAttributes }
					blockAttributes={ props.attributes }
				>
					<AdvancedRangeControl
						label={ __( 'Block Description' ) }
						min={ -50 }
						max={ 100 }
						allowReset={ true }
					/>
				</ResponsiveControl>
			) }
		</Fragment>
	)
}

const addTitleSaveOutput = ( output, design, props ) => {
	const {
		showBlockTitle = false,
		blockTitle = '',
		blockTitleTag = '',
		showBlockDescription = false,
		blockDescription = '',
	} = props.attributes

	return (
		<Fragment>
			{ output }
			{ showBlockTitle && ! RichText.isEmpty( blockTitle ) && (
				<RichText.Content
					tagName={ blockTitleTag || 'h2' }
					className="ugb-block-title"
					value={ blockTitle }
				/>
			) }
			{ showBlockDescription && ! RichText.isEmpty( blockDescription ) && (
				<RichText.Content
					tagName="p"
					className="ugb-block-description"
					value={ blockDescription }
				/>
			) }
		</Fragment>
	)
}

const addStyles = ( styleObject, props ) => {
	const getValue = ( attrName, format = '' ) => {
		const value = typeof props.attributes[ attrName ] === 'undefined' ? '' : props.attributes[ attrName ]
		return value !== '' ? ( format ? sprintf( format, value ) : value ) : undefined
	}

	const {
		showBlockTitle = false,
		blockTitleColor = '',
		showBlockDescription = false,
		blockDescriptionColor = '',
		showBlockBackground = false,
		blockBackgroundBackgroundColor = '',
	} = props.attributes

	const styles = [ styleObject ]

	if ( showBlockTitle ) {
		styles.push( {
			'.ugb-block-title': {
				...createTypographyStyles( 'BlockTitle%s', 'desktop', props.attributes ),
				color: whiteIfDark( blockTitleColor, showBlockBackground && blockBackgroundBackgroundColor ),
				textAlign: getValue( 'blockTitleAlign' ),
				marginBottom: getValue( 'blockTitleBottomMargin', '%spx' ),
			},
			tablet: {
				'.ugb-block-title': {
					...createTypographyStyles( 'BlockTitle%s', 'tablet', props.attributes ),
					textAlign: getValue( 'blockTitleTabletAlign' ),
					marginBottom: getValue( 'blockTitleTabletBottomMargin', '%spx' ),
				},
			},
			mobile: {
				'.ugb-block-title': {
					...createTypographyStyles( 'BlockTitle%s', 'mobile', props.attributes ),
					textAlign: getValue( 'blockTitleMobileAlign' ),
					marginBottom: getValue( 'blockTitleMobileBottomMargin', '%spx' ),
				},
			},
		} )
	}

	if ( showBlockDescription ) {
		styles.push( {
			'.ugb-block-description': {
				...createTypographyStyles( 'BlockDescription%s', 'desktop', props.attributes ),
				color: whiteIfDark( blockDescriptionColor, showBlockBackground && blockBackgroundBackgroundColor ),
				textAlign: getValue( 'blockDescriptionAlign' ),
				marginBottom: getValue( 'blockDescriptionBottomMargin', '%spx' ),
			},
			tablet: {
				'.ugb-block-description': {
					...createTypographyStyles( 'BlockDescription%s', 'tablet', props.attributes ),
					textAlign: getValue( 'blockDescriptionTabletAlign' ),
					marginBottom: getValue( 'blockDescriptionTabletBottomMargin', '%spx' ),
				},
			},
			mobile: {
				'.ugb-block-description': {
					...createTypographyStyles( 'BlockDescription%s', 'mobile', props.attributes ),
					textAlign: getValue( 'blockDescriptionMobileAlign' ),
					marginBottom: getValue( 'blockDescriptionMobileBottomMargin', '%spx' ),
				},
			},
		} )
	}

	return deepmerge.all( styles )
}

// Include the block title & description with the content align reset.
const centerBlockTitle = attributeNamesToReset => {
	return [
		...attributeNamesToReset,
		'BlockTitle%sAlign',
		'BlockDescription%sAlign',
	]
}

const blockTitle = blockName => {
	removeFilter( 'stackable.panel-spacing-body.edit.before', 'stackable/block-title' )
	addFilter( `stackable.${ blockName }.edit.inspector.style.block`, `stackable/${ blockName }/block-title`, addInspectorPanel, 17 )
	addFilter( `stackable.${ blockName }.attributes`, `stackable/${ blockName }/block-title`, addAttributes )
	addFilter( 'stackable.panel-spacing-body.edit.before', 'stackable/block-title', addTitleSpacing )
	addFilter( `stackable.${ blockName }.edit.output.before`, `stackable/${ blockName }/block-title`, addTitleEditOutput )
	addFilter( `stackable.${ blockName }.save.output.before`, `stackable/${ blockName }/block-title`, addTitleSaveOutput )
	addFilter( `stackable.${ blockName }.styles`, `stackable/${ blockName }/block-title`, addStyles )
	addFilter( 'stackable.components.content-align-control.attrNamesToReset', `stackable/${ blockName }/block-title`, centerBlockTitle )
	doAction( `stackable.module.block-title`, blockName )
}

export default blockTitle