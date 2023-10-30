import Adapt from 'core/js/adapt';
import React from 'react';
import a11y from 'core/js/a11y';
import { classes, compile, templates } from 'core/js/reactHelpers';

export default function Accordion (props) {
  const visited = Adapt.course.get('_globals')?._accessibility?._ariaLabels.visited;
  const {
    _id,
    onClick
  } = props;
  return (
    <div className="component__inner accordion__inner">

      <templates.header {...props} />

      <div className="component__widget accordion__widget">

        {props._items.map(({ _graphic, _imageAlignment, _classes, title, body, _index, _isVisited, _isActive }, index) => {

          const ariaLabel = `${_isVisited ? visited + '. ' : ''}${compile(title)}`;

          return (

            <div
              className={classes([
                'accordion-item',
                'js-accordion-item',
                _graphic?.src && 'has-image',
                _graphic?.src && _imageAlignment && `align-image-${_imageAlignment}`,
                _classes
              ])}
              key={_index}
              data-index={_index}
            >

              <div role="heading" aria-level={a11y.ariaLevel({ id: _id, level: 'componentItem' })} >
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

                  <span className="accordion-item__btn-inner">

                    <span className="accordion-item__icon">
                      <span className="icon" aria-hidden="true"></span>
                    </span>

                    <span className="accordion-item__title">
                      <span className="aria-label" dangerouslySetInnerHTML={{ __html: compile(ariaLabel) }}></span>
                      <span className="accordion-item__title-inner" aria-hidden="true" dangerouslySetInnerHTML={{ __html: compile(title) }}>
                      </span>
                    </span>

                  </span>

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
          )
        })}

      </div>

    </div>
  );
}
