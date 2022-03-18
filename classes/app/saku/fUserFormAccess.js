window.app_saku_fUserFormAccess = function(owner)
{
	if (owner)
	{
		window.app_saku_fUserFormAccess.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku_fUserFormAccess";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Log User Form Accessing", 99);	
		uses("portalui_saiGrid;portalui_sgNavigator;portalui_saiCBBL");
		this.eLokasi = new portalui_saiCBBL(this,{bound:[20,10,200,20],caption:"Lokasi",btnClick:[this,"doFindBtnClick"]});
		this.eUser = new portalui_saiCBBL(this,{bound:[20,11,200,20],caption:"user Id",btnClick:[this,"doFindBtnClick"]});
		
        this.p1 = new portalui_panel(this,{bound:[10,10,this.width-20, this.height - 80],caption:"Log User Form Accessing "});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,this.p1.width - 2,this.p1.height - 45],colCount:6,
                colTitle:["User Id","Nama","Lokasi","Tanggal","Session","Form"],
                colWidth:[[5,4,3,2,1,0],[200,150,120,250,250,100]],
                readOnly:true});
        this.pager = 20;
        this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,this.p1.height - 25,this.p1.width - 2,25],buttonStyle:3,pager:[this,"doSelectPage"]});
        this.dbLib = new util_dbLib();
        this.dbLib.addListener(this);
        this.standarLib = new util_standar();
        var tmp = this.dbLib.getRowCount("select count(id) as tot from userformacces where userloc like '"+this.app._lokasi+"%'", this.pager);						
		this.sgn.setTotalPage(tmp);
		this.sgn.rearrange();
		this.sgn.activePage = 0;
		this.sgn.setButtonStyle(3);
		this.rearrangeChild(10,23);
		this.eLokasi.setText(this.app._lokasi, this.app._namalokasi);
		this.dbLib.getDataProviderPageA("select a.uid, ifnull(b.nama,a.uid) as nama, ifnull(c.nama, a.userloc) as lokasi, a.timeacc, a.session,  a.form from userformacces a "+
                          " left outer join lokasi c on c.kode_lokasi = a.userloc "+
                          " left outer join karyawan b on b.nik = a.uid and b.kode_lokasi = a.userloc "+
                          " where a.userloc like '"+this.app._lokasi+"%' order by a.timeacc desc, a.uid",1,this.pager);
 
        this.page = 1;                                  
        this.app._mainForm.pButton.show();
	}
};
window.app_saku_fUserFormAccess.extend(window.portalui_childForm);
window.app_saku_fUserFormAccess.implement({
    doSelectPage: function(sender, page){
        this.sg1.clear();
        this.dbLib.getDataProviderPageA("select a.uid, ifnull(b.nama,a.uid) as nama, ifnull(c.nama, a.userloc) as lokasi, a.timeacc, a.session, a.form from userformacces a "+
                          " left outer join lokasi c on c.kode_lokasi = a.userloc "+
                          " left outer join karyawan b on b.nik = a.uid and b.kode_lokasi = a.userloc "+
                          " where a.userloc like '"+this.eLokasi.getText()+"%' order by a.timeacc desc, a.uid",page,this.pager);
        this.page = page;
    },
    doRequestReady: function(sender, methodName, result){    
         try{
             if (sender === this.dbLib){
                switch(methodName){
                    case "getDataProviderPage" :
                       eval("result = "+result);
                       var line;  
                       for (var i in result.rs.rows){
                           line = result.rs.rows[i];
                           this.sg1.appendData([line.uid, line.nama, line.lokasi, line.timeacc, line.session, line.form]);
                       }
                       this.sg1.setNoUrut((this.page - 1) * this.pager);
                    break;
                }
             }
         }catch(e){
             alert(result);
         }
    },
    doFindBtnClick: function(sender){
        if (sender == this.eLokasi) 
           this.standarLib.showListData(this, "Daftar Lokasi",sender,undefined, 
											  "select kode_lokasi, nama   from lokasi ",
											  "select count(kode_lokasi) from lokasi ",
											  ["kode_lokasi","nama"],"where",["Kode Lokasi","Nama Customer"],false);				
        if (sender == this.eUser) 
           this.standarLib.showListData(this, "Daftar User",sender,undefined, 
											  "select a.uid, ifnull(b.nama,a.uid) as nama, a.form from userformacces a  "+
                       "left outer join karyawan b on b.nik = a.uid and b.kode_lokasi = a.userloc where a.userloc like '"+this.eLokasi.getText()+"' ",
											  "select count(a.uid) from userformacces a  "+
                       "left outer join karyawan b on b.nik = a.uid and b.kode_lokasi = a.userloc where a.userloc like '"+this.eLokasi.getText()+"' ",
											  ["a.uid","nama"],"where",["User Id","Nama","Host"],false);				
    },
    mainButtonClick: function(sender){
        this.sg1.clear();
        var tmp = this.dbLib.getRowCount("select count(id) as tot from userformacces where userloc like '"+this.eLokasi.getText()+"%' ", this.pager);						
		this.sgn.setTotalPage(tmp);
		this.sgn.rearrange();
		this.sgn.activePage = 0;
		this.sgn.setButtonStyle(3);
		this.rearrangeChild(10,23);
		this.dbLib.getDataProviderPageA("select a.uid, ifnull(b.nama,a.uid) as nama, ifnull(c.nama, a.userloc) as lokasi, a.timeacc, a.session, a.form from userformacces a "+
                          " left outer join lokasi c on c.kode_lokasi = a.userloc "+
                          " left outer join karyawan b on b.nik = a.uid and b.kode_lokasi = a.userloc "+
                          " where a.userloc like '"+this.eLokasi.getText()+"%' order by a.timeacc desc, a.uid",1,this.pager);
 
        this.page = 1;                                  
                     
    }
});
