## **Resizing disk drive in Ubuntu guest system, running on a Virtual Box Windows host sytem**
### **On the host machine (Windows)**

- Release the VDI file: File -> Virtual Media Manager -> Select VDI -> Release
- Backup the VDI file
- Open a command prompt and browse to:

    $ **cd** C:\Program Files\Oracle\VirtualBox

- Resize your .vdi file:

    $.\VBoxManage modifyhd 'C:\Users\jochen\VirtualBox VMs\Ubuntu\Ubuntu.vdi' --resize 40000 *# 40 GB disk*

- Startup your virtual machine

### **On the guest machine (Ubuntu)**

- Install & start gparted:

    $ **sudo** **apt-get install** gparted
    $ gparted

- Get rid of the swap partition, which prevents you from expanding the root partition. Note that you cannot harm the rest of your machine - this is all happening inside a single file. Worst case scenario you trash this file and you have to use your backup instead.
- Make a note of the size of the linux-swap partition 4 GB in my case
- Right click on it and swapoff
- Right click on it and Delete
- Apply by clicking on the checkmark (Apply all operations). Ignore the warning
- Right click on the extended file system that once housed the swap partition (/dev/sda2 in all likelihood) and delete it
- Right click on the root partition (/dev/sda1) and resize it. Tab to the 'Free space following' field and enter the size of the swap partition. Shift-tab and the machine will work out the new size for you automatically
- Right click in the unallocated space at the end and make it an extended partition
- Right click in the new partition and select linux-swap in the File system field.
- Commit your changes as before
- Right click on your swap partition and select swapon