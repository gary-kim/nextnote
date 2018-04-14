<?php
/**
 * Nextcloud - NextNote
 *
 *
 * @copyright Copyright (c) 2017, Sander Brand (brantje@gmail.com)
 * @license GNU AGPL version 3 or any later version
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the
 * License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 */

namespace OCA\NextNote\Db;
use \OCP\AppFramework\Db\Entity;

/**
 * @method integer getId()
 * @method void setId(int $value)
 * @method void setName(string $value)
 * @method void setGuid(string $value)
 * @method string getGuid()
 * @method string getName()
 * @method void setGrouping(string $value)
 * @method string getGrouping()
 * @method void setNotebook($value)
 * @method getNotebook()
 * @method void setUid(string $value)
 * @method string getNote()
 * @method void setNote(string $value)
 * @method string getUid()
 * @method void setMtime(integer $value)
 * @method integer getMtime()
 * @method void setDeleted(integer $value)
 * @method integer getDeleted()
 */


class Note extends Entity implements  \JsonSerializable{

	use EntityJSONSerializer;

	protected $name;
	protected $grouping;
	protected $notebook;
	protected $uid;
	protected $guid;
	protected $mtime;
	protected $deleted = 0;
	protected $note;
	protected $shared;
	public function __construct() {
		// add types in constructor
		$this->addType('mtime', 'integer');
		$this->addType('deleted', 'integer');
	}
	/**
	 * Turns entity attributes into an array
	 */
	public function jsonSerialize() {
		$now = new \DateTime();
		return [
			'id' => $this->getId(),
			'guid' => $this->getGuid(),
			'mtime' => $this->getMtime(),
			'timediff' =>  $now->getTimestamp() - $this->getMtime(),
			'title' => $this->getName(),
			'uid' => $this->getUid(),
			'notebook' => $this->getNotebook(),
			'content' => $this->getNote(),
			'content_plain' => strip_tags(html_entity_decode($this->getNote())),
			'deleted' => $this->getDeleted(),
			'permissions' => 31
		];
	}
}
