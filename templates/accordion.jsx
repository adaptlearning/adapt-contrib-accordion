import React from 'react';
import a11y from 'core/js/a11y';
import { html, classes, compile, templates } from 'core/js/reactHelpers';

export default function Accordion (props) {
  const inc = ariaLevel => _.isNumber(ariaLevel) ? ariaLevel + 1 : ariaLevel;
  const {
    _id,
    _ariaLevel,
    onClick
  } = props;
  return (
    <div className="component__inner accordion__inner">

      <templates.header {...props} />

      <div className="component__widget accordion__widget">

        {props._items.map(({ _graphic, _classes, title, body, _index, _isVisited, _isActive }, index) =>

          <div
            className={classes([
              'accordion-item',
              'js-accordion-item',
              _graphic.src && 'has-image',
              _classes
            ])}
            key={_index}
            data-index={_index}
          >

            <div role="heading" aria-level={a11y.ariaLevel('componentItem', inc(_ariaLevel))} >
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
                    <div className="icon"></div>
                  </div>

                  <div className="accordion-item__title">
                    <div className="accordion-item__title-inner">
                      {html(compile(title))}
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
                  <div className="accordion-item__body-inner">
                    {html(compile(body))}
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
