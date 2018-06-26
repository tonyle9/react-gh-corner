import * as React from 'react';
import {Component} from 'react';
import FieldText from '@atlaskit/field-text';
import Select from '@atlaskit/single-select';
import Toggle from '@atlaskit/toggle';
import {AppWrapper, Label} from './styled';
import GHCorner, { CornerPosition } from '../src';

export interface Position {
  content: string;
  value: CornerPosition;
}

export interface AppState {
  href: string;
  position: Position;
  bgColor?: string;
  size?: number;
  ariaLabel?: string;
  openInNewTab?: boolean;
}

const positionItems = [
  {
    items: [
      { value: 'top-right', content: 'Top right' },
      { value: 'top-left', content: 'Top left' }
    ]
  }
];
const selectedItem: any = positionItems[0].items[0];

export default class App extends Component <{}, AppState> {
  state: AppState = {
    href: 'https://github.com/zzarcon/react-gh-corner',
    ariaLabel: 'View source on Github',
    bgColor: '#64CEAA',
    size: 180,
    position: selectedItem,
    openInNewTab: false
  }

  onAriaLabelChange = (e: any) => {
    const ariaLabel = e.target.value;
    this.setState({
      ariaLabel
    });
  }

  onHrefChange = (e: any) => {
    const href = e.target.value;
    this.setState({
      href
    });
  }

  onSizeChange = (e: any) => {
    const size = e.target.value;
    this.setState({
      size
    });
  }

  onColorChange = (e: any) => {
    const bgColor = e.target.value;
    this.setState({
      bgColor
    });
  }

  onPositionChange = (e: any) => {
    this.setState({
      position: e.item
    });
  } 

  onOpenInNewTabChange = () => {
    this.setState({
      openInNewTab: !this.state.openInNewTab
    });
  }

  render() {
    const {href, position, size, bgColor, ariaLabel, openInNewTab} = this.state;

    return (
      <AppWrapper>
        <GHCorner 
          href={href}
          ariaLabel={ariaLabel}
          bgColor={bgColor}
          size={size}
          position={position.value}
          openInNewTab={openInNewTab}
        />
        <Select
          label="Position"
          items={positionItems}
          defaultSelected={selectedItem}
          onSelected={this.onPositionChange}
        />
        <FieldText label="Href" value={href} onChange={this.onHrefChange} />
        <FieldText label="Size" value={`${size}`} onChange={this.onSizeChange} />
        <FieldText label="Aria label" value={ariaLabel} onChange={this.onAriaLabelChange} />
        <div>
          <Label>Color</Label>
          <input value={bgColor} type="color" onChange={this.onColorChange} />
        </div>
        <div>
          <Label>Open in a new tab</Label>
          <Toggle isChecked={openInNewTab} onChange={this.onOpenInNewTabChange} size="large" label="Open in a new tab" />
        </div>
      </AppWrapper>
    )
  }
}