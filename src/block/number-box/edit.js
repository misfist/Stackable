/**
 * External dependencies
 */
import {
	AdvancedRangeControl,
	AlignButtonsControl,
	BackgroundControlsHelper,
	BlockContainer,
	ColorPaletteControl,
	ContentAlignControl,
	DesignPanelBody,
	HeadingButtonsControl,
	PanelAdvancedSettings,
	PanelSpacingBody,
	ProControlButton,
	ResponsiveControl,
	TypographyControlHelper,
} from '~stackable/components'
import {
	createResponsiveAttributeNames,
	createTypographyAttributeNames,
	createVideoBackground,
	descriptionPlaceholder,
	hasBackgroundOverlay,
	range,
} from '~stackable/util'
import {
	withBlockStyles,
	withContentAlignReseter,
	withGoogleFont,
	withSetAttributeHook,
	withTabbedInspector,
	withUniqueClass,
} from '~stackable/higher-order'

/**
 * Internal dependencies
 */
import createStyles from './style'
import ImageDesignBasic from './images/basic.png'
import ImageDesignPlain from './images/plain.png'
import { showOptions } from './util'

/**
 * WordPress dependencies
 */
import {
	__, _x, sprintf,
} from '@wordpress/i18n'
import { addFilter, applyFilters } from '@wordpress/hooks'
import { i18n, showProNotice } from 'stackable'
import {
	PanelBody, RangeControl, SelectControl, TextControl,
} from '@wordpress/components'
import classnames from 'classnames'
import { compose } from '@wordpress/compose'
import { Fragment } from '@wordpress/element'
import { RichText } from '@wordpress/block-editor'
import { ProControl } from '~stackable/components/index'

addFilter( 'stackable.number-box.edit.inspector.layout.before', 'stackable/number-box', ( output, props ) => {
	const { setAttributes } = props
	const {
		design = 'basic',
	} = props.attributes

	return (
		<Fragment>
			{ output }
			<DesignPanelBody
				initialOpen={ true }
				selected={ design }
				options={ [
					{
						image: ImageDesignBasic, label: __( 'Basic', i18n ), value: 'basic',
					},
					{
						image: ImageDesignPlain, label: __( 'Plain', i18n ), value: 'plain',
					},
					...applyFilters( 'stackable.number-box.edit.designs', [] ),
				] }
				onChange={ design => {
					setAttributes( { design } )
				} }
			>
				{ showProNotice && <ProControlButton /> }
			</DesignPanelBody>
		</Fragment>
	)
} )

addFilter( 'stackable.number-box.edit.inspector.style.before', 'stackable/number-box', ( output, props ) => {
	const { setAttributes } = props
	const {
		columns,
		numberColor,
		titleColor,
		descriptionColor,
		numberBGColor,
		design = 'basic',
		borderRadius = 12,
		shadow = 3,
		showNumber = true,
		showTitle = true,
		showDescription = true,
		titleTag = '',
		numberStyle = '',
		num1 = '',
		num2 = '',
		num3 = '',
		numberOpacity = '',
	} = props.attributes

	const show = showOptions( props )

	return (
		<Fragment>
			{ output }
			<PanelBody title={ __( 'General', i18n ) }>
				<RangeControl
					label={ __( 'Columns', i18n ) }
					value={ columns }
					onChange={ columns => setAttributes( { columns } ) }
					min={ 1 }
					max={ 3 }
				/>
				{ show.borderRadius &&
					<RangeControl
						label={ __( 'Border Radius', i18n ) }
						value={ borderRadius }
						onChange={ ( borderRadius = 12 ) => setAttributes( { borderRadius } ) }
						min={ 0 }
						max={ 50 }
						allowReset={ true }
					/>
				}
				{ show.shadow &&
					<RangeControl
						label={ __( 'Shadow / Outline', i18n ) }
						value={ shadow }
						onChange={ ( shadow = 3 ) => setAttributes( { shadow } ) }
						min={ 0 }
						max={ 9 }
						allowReset={ true }
					/>
				}
				<ContentAlignControl
					setAttributes={ setAttributes }
					blockAttributes={ props.attributes }
				/>
			</PanelBody>

			{ show.columnBackground &&
				<PanelBody
					title={ __( 'Column Background', i18n ) }
					initialOpen={ false }
				>
					<BackgroundControlsHelper
						attrNameTemplate="column%s"
						setAttributes={ setAttributes }
						blockAttributes={ props.attributes }
					/>
				</PanelBody>
			}

			<PanelSpacingBody initialOpen={ false } blockProps={ props }>
				{ show.spacingNumber && showNumber && (
					<ResponsiveControl
						attrNameTemplate="number%sBottomMargin"
						setAttributes={ setAttributes }
						blockAttributes={ props.attributes }
					>
						<AdvancedRangeControl
							label={ __( 'Number', i18n ) }
							min={ -50 }
							max={ 100 }
							allowReset={ true }
						/>
					</ResponsiveControl>
				) }
				{ showTitle && (
					<ResponsiveControl
						attrNameTemplate="title%sBottomMargin"
						setAttributes={ setAttributes }
						blockAttributes={ props.attributes }
					>
						<AdvancedRangeControl
							label={ __( 'Title', i18n ) }
							min={ -50 }
							max={ 100 }
							allowReset={ true }
						/>
					</ResponsiveControl>
				) }
			</PanelSpacingBody>

			<PanelAdvancedSettings
				title={ __( 'Number', i18n ) }
				checked={ showNumber }
				onChange={ showNumber => setAttributes( { showNumber } ) }
				toggleOnSetAttributes={ [
					...createTypographyAttributeNames( 'number%s' ),
					'num1',
					'num2',
					'num3',
					...createResponsiveAttributeNames( 'number%sPadding' ),
					'numberStyle',
					'numberColor',
					'numberOpacity',
					...createResponsiveAttributeNames( 'Number%sAlign' ),
				] }
				toggleAttributeName="showNumber"
			>
				<TextControl
					label={ sprintf( _x( '%s %d %s', 'Nth Title with description', i18n ), __( 'Number', i18n ), 1, __( 'Label', i18n ) ) }
					value={ num1 }
					onChange={ num1 => setAttributes( { num1 } ) }
				/>
				{ columns !== '' && columns >= 2 && (
					<TextControl
						label={ sprintf( _x( '%s %d %s', 'Nth Title with description', i18n ), __( 'Number', i18n ), 2, __( 'Label', i18n ) ) }
						value={ num2 }
						onChange={ num2 => setAttributes( { num2 } ) }
					/>
				) }
				{ columns !== '' && columns >= 3 && (
					<TextControl
						label={ sprintf( _x( '%s %d %s', 'Nth Title with description', i18n ), __( 'Number', i18n ), 3, __( 'Label', i18n ) ) }
						value={ num3 }
						onChange={ num3 => setAttributes( { num3 } ) }
					/>
				) }
				<TypographyControlHelper
					attrNameTemplate="number%s"
					setAttributes={ setAttributes }
					blockAttributes={ props.attributes }
					fontSizeProps={ {
						max: design === 'basic' || design === 'plain' ? [ 150, 7 ] : [ 500, 15 ],
						min: 40,
					} }
				/>
				{ show.numberStyle && (
					<SelectControl
						label={ __( 'Number Shape', i18n ) }
						options={ [
							{ label: __( 'None', i18n ), value: 'none' },
							{ label: __( 'Circle', i18n ), value: '' },
							{ label: __( 'Square', i18n ), value: 'square' },
						] }
						value={ numberStyle }
						onChange={ numberStyle => setAttributes( { numberStyle } ) }
					/>
				) }
				{ show.numberBGColor && (
					<ResponsiveControl
						attrNameTemplate="number%sPadding"
						setAttributes={ setAttributes }
						blockAttributes={ props.attributes }
					>
						<AdvancedRangeControl
							label={ __( 'Shape Size', i18n ) }
							min={ 0 }
							max={ 5 }
							step={ 0.1 }
							allowReset={ true }
						/>
					</ResponsiveControl>
				) }
				{ show.numberBGColor && (
					<ColorPaletteControl
						value={ numberBGColor }
						onChange={ numberBGColor => setAttributes( { numberBGColor } ) }
						label={ __( 'Number Background Color', i18n ) }
					/>
				) }
				{ show.numberColor && (
					<ColorPaletteControl
						value={ numberColor }
						onChange={ numberColor => setAttributes( { numberColor } ) }
						label={ __( 'Number Color', i18n ) }
					/>
				) }
				<AdvancedRangeControl
					label={ __( 'Opacity', i18n ) }
					min={ 0.1 }
					max={ 1.0 }
					step={ 0.1 }
					value={ numberOpacity }
					onChange={ numberOpacity => setAttributes( { numberOpacity } ) }
					allowReset={ true }
				/>
				<ResponsiveControl
					attrNameTemplate="Number%sAlign"
					setAttributes={ setAttributes }
					blockAttributes={ props.attributes }
				>
					<AlignButtonsControl label={ __( 'Align', i18n ) } />
				</ResponsiveControl>
			</PanelAdvancedSettings>

			<PanelAdvancedSettings
				title={ __( 'Title', i18n ) }
				checked={ showTitle }
				onChange={ showTitle => setAttributes( { showTitle } ) }
				toggleOnSetAttributes={ [
					...createTypographyAttributeNames( 'title%s' ),
					'titleTag',
					'titleColor',
					...createResponsiveAttributeNames( 'Title%sAlign' ),
				] }
				toggleAttributeName="showTitle"
			>
				<TypographyControlHelper
					attrNameTemplate="title%s"
					setAttributes={ setAttributes }
					blockAttributes={ props.attributes }
				/>
				<HeadingButtonsControl
					label={ __( 'Title HTML Tag', i18n ) }
					value={ titleTag || 'h4' }
					onChange={ titleTag => setAttributes( { titleTag } ) }
				/>
				<ColorPaletteControl
					value={ titleColor }
					onChange={ titleColor => setAttributes( { titleColor } ) }
					label={ __( 'Title Color', i18n ) }
				/>
				<ResponsiveControl
					attrNameTemplate="Title%sAlign"
					setAttributes={ setAttributes }
					blockAttributes={ props.attributes }
				>
					<AlignButtonsControl label={ __( 'Align', i18n ) } />
				</ResponsiveControl>
			</PanelAdvancedSettings>

			<PanelAdvancedSettings
				title={ __( 'Description', i18n ) }
				checked={ showDescription }
				onChange={ showDescription => setAttributes( { showDescription } ) }
				toggleOnSetAttributes={ [
					...createTypographyAttributeNames( 'description%s' ),
					'descriptionColor',
					...createResponsiveAttributeNames( 'description%sAlign' ),
				] }
				toggleAttributeName="showDescription"
			>
				<TypographyControlHelper
					attrNameTemplate="description%s"
					setAttributes={ setAttributes }
					blockAttributes={ props.attributes }
				/>
				<ColorPaletteControl
					value={ descriptionColor }
					onChange={ descriptionColor => setAttributes( { descriptionColor } ) }
					label={ __( 'Description Color', i18n ) }
				/>
				<ResponsiveControl
					attrNameTemplate="description%sAlign"
					setAttributes={ setAttributes }
					blockAttributes={ props.attributes }
				>
					<AlignButtonsControl label={ __( 'Align', i18n ) } />
				</ResponsiveControl>
			</PanelAdvancedSettings>
		</Fragment>
	)
} )

addFilter( `stackable.number-box.edit.inspector.advanced.before`, `stackable/number-box/column-colors`, output => {
	return (
		<Fragment>
			{ output }
			{ showProNotice &&
				<PanelBody
					title={ __( 'Fine-Grained Controls', i18n ) }
					initialOpen={ false }
				>
					{ <ProControl type="advanced" /> }
				</PanelBody>
			}
		</Fragment>
	)
} )

const edit = props => {
	const {
		className,
		setAttributes,
		attributes,
	} = props

	const {
		columns,
		// numberColor,
		// titleColor,
		// descriptionColor,
		// numberBGColor,
		design = 'basic',
		titleTag = '',
		// borderRadius = 12,
		shadow = 3,
		showNumber = true,
		showTitle = true,
		showDescription = true,
		numberStyle = '',
		// backgroundColor,
	} = props.attributes

	const mainClasses = classnames( [
		className,
		'ugb-number-box--v3',
		`ugb-number-box--columns-${ columns }`,
	], applyFilters( 'stackable.number-box.mainclasses', {
		[ `ugb-number-box--design-${ design }` ]: design !== 'basic',
		[ `ugb-number-box--number-style-${ numberStyle }` ]: numberStyle !== '' && ( design === 'basic' || design === 'plain' ),
	}, design, props ) )

	const show = showOptions( props )

	return (
		<BlockContainer.Edit className={ mainClasses } blockProps={ props } render={ () => (
			<Fragment>
				{ range( 1, columns + 1 ).map( i => {
					const num = attributes[ `num${ i }` ]
					const title = attributes[ `title${ i }` ]
					const description = attributes[ `description${ i }` ]

					const boxClasses = classnames( [
						'ugb-number-box__item',
						`ugb-number-box__item${ i }`,
					], applyFilters( 'stackable.number-box.boxclasses', {
						[ `ugb--shadow-${ shadow }` ]: design !== 'plain' && shadow !== 3,
						'ugb--has-background-overlay': hasBackgroundOverlay( 'column%s', props.attributes ),
					}, design, props ) )

					return (
						<div className={ boxClasses } key={ i }>
							{ showNumber && (
								<RichText
									tagName="div"
									className="ugb-number-box__number"
									value={ num }
									onChange={ value => setAttributes( { [ `num${ i }` ]: value } ) }
								/>
							) }
							{ ( showTitle || showDescription ) && (
								<div className="ugb-number-box__content">
									{ showTitle && (
										<RichText
											tagName={ titleTag || 'h4' }
											value={ title }
											className="ugb-number-box__title"
											onChange={ value => setAttributes( { [ `title${ i }` ]: value } ) }
											placeholder={ __( 'Title', i18n ) }
											keepPlaceholderOnFocus
										/>
									) }
									{ showDescription && (
										<RichText
											tagName="p"
											value={ description }
											className="ugb-number-box__description"
											onChange={ value => setAttributes( { [ `description${ i }` ]: value } ) }
											placeholder={ descriptionPlaceholder() }
											keepPlaceholderOnFocus
										/>
									) }
								</div>
							) }
							{ show.columnBackground && createVideoBackground( 'column%s', props ) }
						</div>
					)
				} ) }
			</Fragment>
		) } />
	)
}

export default compose(
	withUniqueClass,
	withSetAttributeHook,
	withGoogleFont,
	withTabbedInspector(),
	withContentAlignReseter( [ 'Number%sAlign', 'Title%sAlign', 'Description%sAlign' ] ),
	withBlockStyles( createStyles, { editorMode: true } ),
)( edit )
