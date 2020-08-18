import Adapt from 'core/js/adapt';
import { compile, classes, templates, html } from 'core/js/reactHelpers';

export default function (model, view) {
  const data = model.toJSON();
  data._globals = Adapt.course.get('_globals');
  return (
    <div className="component__inner accordion__inner">

      {templates.component(model, view)}

      <div className="component__widget accordion__widget">

        {data._items.map(({ _graphic, _classes, title, body, _index, _isVisited, _isActive }, index) =>

          <div
            className={classes([
              'accordion__item',
              _graphic.src && 'has-image',
              _classes && _classes
            ])}
            key={_index}
            data-index={_index}
          >

            <button
              id={`${data._id}-${index}-accordion-button`}
              className={classes([
                'accordion__item-btn',
                'js-toggle-item',
                _isVisited && 'is-visited',
                _isActive ? 'is-open is-selected' : 'is-closed'
              ])}
              onClick={view.onClick.bind(view)}
              aria-expanded={_isActive ? 'true' : 'false'}
            >

              <div className="accordion__item-btn-inner">

                <div className="accordion__item-icon">
                  <div className="icon"></div>
                </div>

                <div className="accordion__item-title">
                  <div className="accordion__item-title-inner">
                    {html(title)}
                  </div>
                </div>

              </div>

            </button>

            <div
              className="accordion__item-content"
              role="region"
              aria-labelledby={`${data._id}-${index}-accordion-button`}
            >

              <div className="accordion__item-content-inner">

                {body &&
                <div className="accordion__item-body">
                  <div className="accordion__item-body-inner">
                    {html(compile(body))}
                  </div>
                </div>
                }

                {_graphic.src &&
                <div className={classes([
                  'accordion__item-image-container',
                  _graphic.attribution && 'has-attribution'
                ])}>

                  <img
                    className="accordion__item-image"
                    src={_graphic.src}
                    aria-label={_graphic.alt ? Adapt.a11y.normalize(_graphic.alt) : ''}
                    aria-hidden={!_graphic.alt}
                  />

                  {_graphic.attribution &&
                  <div className="component__attribution accordion__attribution">
                    <div className="component__attribution-inner accordion__attribution-inner">
                      {html(_graphic.attribution)}
                    </div>
                  </div>
                  }

                </div>
                }

              </div>
            </div>

          </div>
        )}

      </div>

    </div>
  );
}
