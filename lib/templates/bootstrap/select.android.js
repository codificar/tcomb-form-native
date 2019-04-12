var React = require("react");
var { View, Text, Picker, Item } = require("react-native");


var pickerContainerStyle = {
  normal: {
      // color: "#101010",
			// fontSize: FONT_SIZE,
			height: 50,
			paddingHorizontal: 7,
			borderRadius: 0,
			borderBottomColor: "#cccccc",
			borderBottomWidth: 1,
      marginBottom: 25,
      // paddingBottom: 10
  }
}
function select(locals) {
  if (locals.hidden) {
    return null;
  }

  var stylesheet = locals.stylesheet;
  var formGroupStyle = stylesheet.formGroup.normal;
  var controlLabelStyle = stylesheet.controlLabel.normal;
  var selectStyle = Object.assign(
    {},
    // stylesheet.select.normal,
    // stylesheet.pickerContainer.normal
    pickerContainerStyle.normal
  );
  var helpBlockStyle = stylesheet.helpBlock.normal;
  var errorBlockStyle = stylesheet.errorBlock;

  if (locals.hasError) {
    formGroupStyle = stylesheet.formGroup.error;
    controlLabelStyle = stylesheet.controlLabel.error;
    selectStyle = stylesheet.select.error;
    helpBlockStyle = stylesheet.helpBlock.error;
  }

  var label = locals.label ? (
    <Text style={[controlLabelStyle, {marginLeft: -7}]}>{locals.label.toUpperCase()}</Text> 
  ) : null;
  var help = locals.help ? (
    <Text style={helpBlockStyle}>{locals.help}</Text>
  ) : null;
  var error =
    locals.hasError && locals.error ? (
      <Text accessibilityLiveRegion="polite" style={[errorBlockStyle, { top: -20 }]}>
        {locals.error}
      </Text>
    ) : null;

  var options = locals.options.map(({ value, text }) => (
    // <Item color="blue"  key={value} value={value} label={text} style={{ fontSize: 10 }} />
    <Picker.Item color="#3e3e3e" key={value} value={value} label={text} />
  ));

  return (
    // <View style={ formGroupStyle}>
    <View style={pickerContainerStyle.normal}>    
      {label}
      <Picker
        // pickerStyleType={true}
        accessibilityLabel={locals.label}
        ref="input"        
        selectedValue={locals.value}
        onValueChange={locals.onChange}
        help={locals.help}
        enabled={locals.enabled}
        mode={locals.mode}
        prompt={locals.prompt}
        itemStyle={selectStyle}
        style={{position: 'relative', bottom: 10, left: -10}}
        textStyle={{fontSize: 11}}
      >
        {options}
      </Picker>
      {help}
      {error}
    </View>
  );
}

module.exports = select;
