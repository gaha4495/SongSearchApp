DROP TABLE IF EXISTS savedAudio CASCADE;
CREATE TABLE IF NOT EXISTS savedAudio (
  submission VARCHAR(30),       /* Stage Name of the Submitted Artist / Group                     */
  nameAlt VARCHAR(100),   /*     Real Name     */
  genre VARCHAR(30),  /* Artist Genre */
  country VARCHAR(30),        /* Place of Birt    */
  bio VARCHAR(10000),         /* Small Artist BIO*/
  label VARCHAR(50),          /* Artist Music Label */
  id SERIAL PRIMARY KEY
);


