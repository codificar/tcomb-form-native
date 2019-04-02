var React = require("react");
var { View, Text, TextInput } = require("react-native");

import { TextInputMask } from 'react-native-masked-text'

function textbox(locals) {
	if (locals.hidden) {
		return null;
	}

	if (locals.mask)
		var mask = locals.mask;

	var stylesheet = locals.stylesheet;
	var formGroupStyle = stylesheet.formGroup.normal;
	var controlLabelStyle = stylesheet.controlLabel.normal;
	var textboxStyle = stylesheet.textbox.normal;
	var textboxViewStyle = stylesheet.textboxView.normal;
	var helpBlockStyle = stylesheet.helpBlock.normal;
	var errorBlockStyle = stylesheet.errorBlock;

	if (locals.hasError) {
		formGroupStyle = stylesheet.formGroup.error;
		controlLabelStyle = stylesheet.controlLabel.error;
		textboxStyle = stylesheet.textbox.error;
		textboxViewStyle = stylesheet.textboxView.error;
		helpBlockStyle = stylesheet.helpBlock.error;
	}

	if (locals.editable === false) {
		textboxStyle = stylesheet.textbox.notEditable;
		textboxViewStyle = stylesheet.textboxView.notEditable;
	}

	var label = locals.label ? (
		<Text style={controlLabelStyle}>{locals.label.toUpperCase()}</Text>
	) : null;
	var help = locals.help ? (
		<Text style={helpBlockStyle}>{locals.help}</Text>
	) : null;
	var error =
		locals.hasError && locals.error ? (
			<Text accessibilityLiveRegion="polite" style={errorBlockStyle}>
				{locals.error}
			</Text>
		) : null;
	return (
		<View style={formGroupStyle}>
			{label}
			<View style={textboxViewStyle}>
				{locals.mask ?
					<TextInputMask
						type={'custom'}
						options={{
							mask: mask
						}}
						accessibilityLabel={locals.label}
						ref={"input"}
						autoCapitalize={locals.autoCapitalize}
						autoCorrect={locals.autoCorrect}
						autoFocus={locals.autoFocus}
						blurOnSubmit={locals.blurOnSubmit}
						editable={locals.editable}
						keyboardType={locals.keyboardType}
						maxLength={locals.maxLength}
						multiline={locals.multiline}
						onBlur={locals.onBlur}
						onEndEditing={locals.onEndEditing}
						onFocus={locals.onFocus}
						onLayout={locals.onLayout}
						onSelectionChange={locals.onSelectionChange}
						onSubmitEditing={locals.onSubmitEditing}
						onContentSizeChange={locals.onContentSizeChange}
						placeholderTextColor={locals.placeholderTextColor}
						secureTextEntry={locals.secureTextEntry}
						selectTextOnFocus={locals.selectTextOnFocus}
						selectionColor={locals.selectionColor}
						numberOfLines={locals.numberOfLines}
						underlineColorAndroid={locals.underlineColorAndroid}
						clearButtonMode={locals.clearButtonMode}
						clearTextOnFocus={locals.clearTextOnFocus}
						enablesReturnKeyAutomatically={locals.enablesReturnKeyAutomatically}
						keyboardAppearance={locals.keyboardAppearance}
						onKeyPress={locals.onKeyPress}
						returnKeyType={locals.returnKeyType}
						selectionState={locals.selectionState}
						// onChangeText={ value ={ > locals.onChange(value}

						onChange={locals.onChangeNative}

						onChangeText={value => locals.onChange(value, value, locals.path)}
						placeholder={locals.placeholder}
						style={[textboxStyle, { color: "#3e3e3e", fontSize: 16}]}
						value={locals.value}
					/>
					:
					<TextInput
						accessibilityLabel={locals.label}
						ref={"input"}
						autoCapitalize={locals.autoCapitalize}
						autoCorrect={locals.autoCorrect}
						autoFocus={locals.autoFocus}
						blurOnSubmit={locals.blurOnSubmit}
						editable={locals.editable}
						keyboardType={locals.keyboardType}
						maxLength={locals.maxLength}
						multiline={locals.multiline}
						onBlur={locals.onBlur}
						onEndEditing={locals.onEndEditing}
						onFocus={locals.onFocus}
						onLayout={locals.onLayout}
						onSelectionChange={locals.onSelectionChange}
						onSubmitEditing={locals.onSubmitEditing}
						onContentSizeChange={locals.onContentSizeChange}
						placeholderTextColor={locals.placeholderTextColor}
						secureTextEntry={locals.secureTextEntry}
						selectTextOnFocus={locals.selectTextOnFocus}
						selectionColor={locals.selectionColor}
						numberOfLines={locals.numberOfLines}
						underlineColorAndroid={locals.underlineColorAndroid}
						clearButtonMode={locals.clearButtonMode}
						clearTextOnFocus={locals.clearTextOnFocus}
						enablesReturnKeyAutomatically={locals.enablesReturnKeyAutomatically}
						keyboardAppearance={locals.keyboardAppearance}
						onKeyPress={locals.onKeyPress}
						returnKeyType={locals.returnKeyType}
						selectionState={locals.selectionState}
						// onChangeText={ value ={ > locals.onChange(value}

						onChange={locals.onChangeNative}

						onChangeText={value => locals.onChange(value, value, locals.path)}
						placeholder={locals.placeholder}
						style={[textboxStyle, { color: "#3e3e3e", fontSize: 16}]}
						value={locals.value}
					/>
				}
			</View>
			{help}
			{error}
		</View>
	);
}

module.exports = textbox;
