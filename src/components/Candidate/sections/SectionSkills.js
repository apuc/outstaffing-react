import React from 'react';
import style from './SectionSkills.module.css';

const SectionSkills = () => {
  return (
    <div className={style.SectionSkills}>
      <h3>Навыки:</h3>
      <p>
        PHP: Native, Laravel, Zend Framework, CodeIgniter, YII, Symfony. JavaScript: Native, jQuery, AngularJS, ExtJS,
        BackboneJS, ReactJS + Redux, VueJS. Search Engines: Sphinx, Elastic Search. Cache: Memcache, Redis. Profiling:
        Xdebug, XHProf. WebSockets: Ratchet, Socket.io. Очереди: RabbitMQ, Beanstalk. MySQL, PostgreSQL, Oracle, MsSQL,
        Vertica, HBase, Cassandra, MongoDB, Redis, Tarantool. CSS 2/3 (Sass, Less). HTML 4/5.
      </p>
    </div>
  );
};

export default SectionSkills;
