import Adapt from 'core/js/adapt';
import React from 'react';
import a11y from 'core/js/a11y';
import { classes, compile, templates } from 'core/js/reactHelpers';

export default function Accordion (props) {
  const { complete, incomplete } = Adapt.course.get('_globals')?._accessibility?._ariaLabels;
  const {
    _id,
    _ariaLevel,
    onClick
  } = props;
  const itemAriaLevel = _.isNumber(_ariaLevel) ? _ariaLevel + 1 : _ariaLevel;
  return (
    <div className="component__inner accordion__inner">

      <templates.header {...props} />

      <div className="component__widget accordion__widget">

        {props._items.map(({ _graphic, _classes, title, body, _index, _isVisited, _isActive }, index) =>

          <div
            className={classes([
              'accordion-item',
              'js-accordion-item',
              _graphic?.src && 'has-image',
              _classes
            ])}
            key={_index}
            data-index={_index}
          >

            <div role="heading" aria-level={a11y.ariaLevel('componentItem', itemAriaLevel)} >
              <button
                id={`${_id}-${index}-accordion-button`}
                className={classes([
                  'accordion-item__btn',
                  'js-toggle-item',
                  _isVisited && 'is-visited',
                  _isActive ? 'is-open is-selected' : 'is-closed'
                ])}
                onClick={onClick}
                aria-expanded={_isActive.toString()}
                aria-controls={`${_id}-${index}-accordion-button-panel`}
              >

                <div className="accordion-item__btn-inner">

                  <div className="accordion-item__icon">
                    <div className="icon" aria-hidden="true"></div>
                  </div>

                  <div className="accordion-item__title">
                    <span className="aria-label">{`${_isVisited ? complete : incomplete} ${compile(title)}`}</span>
                    <div className="accordion-item__title-inner" aria-hidden="true" dangerouslySetInnerHTML={{ __html: compile(title) }}>
                    </div>
                  </div>

                </div>

              </button>
            </div>

            <div
              id={`${_id}-${index}-accordion-button-panel`}
              className="accordion-item__content js-accordion-item-content"
              role="region"
              aria-labelledby={`${_id}-${index}-accordion-button`}
            >

              <div className="accordion-item__content-inner">

                {body &&
                <div className="accordion-item__body">
                  <div className="accordion-item__body-inner" dangerouslySetInnerHTML={{ __html: compile(body) }}>
                  </div>
                </div>
                }

                <templates.image {..._graphic}
                  classNamePrefixes={['component-item', 'accordion-item']}
                  attributionClassNamePrefixes={['component', 'accordion']}
                />

              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
