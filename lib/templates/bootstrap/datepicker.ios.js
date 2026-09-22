import React from "react";
import PropTypes from "prop-types";
import {
  Animated,
  View,
  TouchableOpacity,
  Text
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

const UIPICKER_HEIGHT = 216;

class CollapsibleDatePickerIOS extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCollapsed: true,
      height: new Animated.Value(0)
    };
  }

  render() {
    const locals = this.props.locals;
    const stylesheet = locals.stylesheet;
    let touchableStyle = stylesheet.dateTouchable.normal;
    let datepickerStyle = stylesheet.datepicker.normal;
    let dateValueStyle = stylesheet.dateValue.normal;
    if (locals.hasError) {
      touchableStyle = stylesheet.dateTouchable.error;
      datepickerStyle = stylesheet.datepicker.error;
      dateValueStyle = stylesheet.dateValue.error;
    }
    let formattedValue = String(locals.value);
    let animation = Animated.timing;
    let animationConfig = {
      duration: 200
    };
    if (locals.config) {
      if (locals.config.format) {
        formattedValue = locals.config.format(locals.value);
      }
      if (locals.config.animation) {
        animation = locals.config.animation;
      }
      if (locals.config.animationConfig) {
        animationConfig = locals.config.animationConfig;
      }
    }
    const height = this.state.isCollapsed ? 0 : UIPICKER_HEIGHT;
    const value =
      locals.value instanceof Date
        ? locals.value
        : locals.value
          ? new Date(locals.value)
          : new Date();
    return (
      <View>
        <TouchableOpacity
          style={touchableStyle}
          disabled={locals.disabled}
          onPress={() => {
            animation(
              this.state.height,
              Object.assign(
                {
                  toValue: this.state.isCollapsed ? UIPICKER_HEIGHT : 0
                },
                animationConfig
              )
            ).start();
            this.setState({ isCollapsed: !this.state.isCollapsed });
            if (typeof locals.onPress === "function") {
              locals.onPress();
            }
          }}
        >
          <Text style={dateValueStyle}>{formattedValue}</Text>
        </TouchableOpacity>
        <Animated.View
          style={{ height: this.state.height, overflow: "hidden" }}
        >
          {!this.state.isCollapsed ? (
            <DateTimePicker
              accessibilityLabel={locals.label}
              value={value}
              maximumDate={locals.maximumDate}
              minimumDate={locals.minimumDate}
              minuteInterval={locals.minuteInterval}
              mode={locals.mode || "date"}
              display="spinner"
              onChange={(event, date) => {
                if (date) {
                  locals.onChange(date);
                }
              }}
              style={[datepickerStyle, { height: height }]}
            />
          ) : null}
        </Animated.View>
      </View>
    );
  }
}

CollapsibleDatePickerIOS.propTypes = {
  locals: PropTypes.object.isRequired
};

function datepicker(locals) {
  if (locals.hidden) {
    return null;
  }

  const stylesheet = locals.stylesheet;
  let formGroupStyle = stylesheet.formGroup.normal;
  let controlLabelStyle = stylesheet.controlLabel.normal;
  let helpBlockStyle = stylesheet.helpBlock.normal;
  const errorBlockStyle = stylesheet.errorBlock;

  if (locals.hasError) {
    formGroupStyle = stylesheet.formGroup.error;
    controlLabelStyle = stylesheet.controlLabel.error;
    helpBlockStyle = stylesheet.helpBlock.error;
  }

  const label = locals.label ? (
    <Text style={controlLabelStyle}>{locals.label.toUpperCase()}</Text>
  ) : null;
  const help = locals.help ? (
    <Text style={helpBlockStyle}>{locals.help}</Text>
  ) : null;
  const error =
    locals.hasError && locals.error ? (
      <Text accessibilityLiveRegion="polite" style={errorBlockStyle}>
        {locals.error}
      </Text>
    ) : null;

  return (
    <View style={formGroupStyle}>
      {label}
      <CollapsibleDatePickerIOS locals={locals} />
      {help}
      {error}
    </View>
  );
}

module.exports = datepicker;
