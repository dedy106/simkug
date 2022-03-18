window.app_hris_fUserAccess = function(owner)
{
	if (owner)
	{
		window.app_hris_fUserAccess.prototype.parent.constructor.call(this,owner);
		this.className  = "app_hris_fUserAccess";
		this.maximize();
		this.itemsValue = new portalui_arrayList();	
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Log User Login", 99);	
		uses("portalui_saiGrid;portalui_sgNavigator;portalui_saiCBBL");
		this.eLokasi = new portalui_saiCBBL(this,{bound:[20,10,200,20],caption:"Lokasi",btnClick:[this,"doFindBtnClick"]});
		this.eUser = new portalui_saiCBBL(this,{bound:[20,11,200,20],caption:"user Id",btnClick:[this,"doFindBtnClick"]});
		
        this.p1 = new portalui_panel(this,{bound:[10,10,this.width-20, this.height - 80],caption:"Log User Login"});
		this.sg1 = new portalui_saiGrid(this.p1,{bound:[1,20,this.p1.width - 2,this.p1.height - 45],colCount:6,
                colTitle:["User Id","Nama","Lokasi","Tanggal","Session","IP/Host"],
                colWidth:[[5,4,3,2,1,0],[100,150,120,250,250,100]],
                readOnly:true});
        this.pager = 20;
        this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,this.p1.height - 25,this.p1.width - 2,25],buttonStyle:3,pager:[this,"doSelectPage"]});
        this.dbLib = new util_dbLib();
        this.dbLib.addListener(this);
        this.standarLib = new util_standar();
        var tmp = this.dbLib.getRowCount("select count(id) as tot from userlog where userloc like '"+this.app._lokasi+"%'", this.pager);						
		this.sgn.setTotalPage(tmp);
		this.sgn.rearrange();
		this.sgn.activePage = 0;
		this.sgn.setButtonStyle(3);
		this.rearrangeChild(10,23);
		this.eLokasi.setText(this.app._lokasi, this.app._namalokasi);
		this.dbLib.getDataProviderPageA("select \"A\".\"UID\", nvl(b.nama,\"A\".\"UID\") as nama, nvl(c.nama, \"A\".\"USERLOC\") as lokasi, \"A\".\"TIMEIN\", \"A\".\"SESSION\", \"A\".\"TIMEOUT\", \"A\".\"HOST\" from userlog A "+
                          " left outer join amu_lokasi c on c.kode_lokfa = \"A\".\"USERLOC\" "+
                          " left outer join amu_karyawan b on b.nik = \"A\".\"UID\" and b.kode_lokasi = \"A\".\"USERLOC\" "+
                          " order by \"A\".\"TIMEIN\" desc, \"A\".\"UID\"",1,this.pager);
 
        this.page = 1;                                  
        this.app._mainForm.pButton.show();
	}
};
window.app_hris_fUserAccess.extend(window.portalui_childForm);
window.app_hris_fUserAccess.implement({
    doSelectPage: function(sender, page){
        this.sg1.clear();
        this.dbLib.getDataProviderPageA("select \"A\".\"UID\", nvl(b.nama,\"A\".\"UID\") as nama, nvl(c.nama, \"A\".\"USERLOC\") as lokasi, \"A\".\"TIMEIN\", \"A\".\"SESSION\", \"A\".\"TIMEOUT\", \"A\".\"HOST\" from userlog A "+
                          " left outer join amu_lokasi c on c.kode_lokfa = \"A\".\"USERLOC\" "+
                          " left outer join amu_karyawan b on b.nik = \"A\".\"UID\" and b.kode_lokasi = \"A\".\"USERLOC\" "+
                          " order by \"A\".\"TIMEIN\" desc, \"A\".\"UID\"",page,this.pager);
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
                           this.sg1.appendData([line.uid, line.nama, line.lokasi, line.timein, line.session, line.host]);
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
											  "select kode_lokfa, nama   from amu_lokasi ",
											  "select count(kode_lokfa) from amu_lokasi ",
											  ["kode_lokfa","nama"],"where",["Kode Lokasi","Nama"],false);				
        if (sender == this.eUser) 
           this.standarLib.showListData(this, "Daftar User",sender,undefined, 
											  "select \"A\".\"UID\", nvl(b.nama,\"A\".\"UID\") as nama, \"A\".\"HOST\" from userlog A  "+
                       "left outer join amu_karyawan b on b.nik = \"A\".\"UID\" and b.kode_lokasi = \"A\".\"USERLOC\" where \"A\".\"USERLOC\" like '"+this.eLokasi.getText()+"' ",
											  "select count(\"A\".\"UID\") from userlog A  "+
                       "left outer join karyawan b on b.nik = a.uid and b.kode_lokasi = \"A\".\"USERLOC\" where \"A\".\"USERLOC\" like '"+this.eLokasi.getText()+"' ",
											  ["\"A\".\"UID\"","nama"],"where",["User Id","Nama","Host"],false);				
    },
    mainButtonClick: function(sender){
        this.sg1.clear();
        var tmp = this.dbLib.getRowCount("select count(id) as tot from userlog where userloc like '"+this.eLokasi.getText()+"%' ", this.pager);						
		this.sgn.setTotalPage(tmp);
		this.sgn.rearrange();
		this.sgn.activePage = 0;
		this.sgn.setButtonStyle(3);
		this.rearrangeChild(10,23);
		this.dbLib.getDataProviderPageA("select \"A\".\"UID\", nvl(b.nama,\"A\".\"UID\") as nama, nvl(c.nama, \"A\".\"USERLOC\") as lokasi, \"A\".\"TIMEIN\", \"A\".\"SESSION\", \"A\".\"TIMEOUT\", \"A\".\"HOST\" from userlog A "+
                          " left outer join amu_lokasi c on c.kode_lokfa = \"A\".\"USERLOC\" "+
                          " left outer join amu_karyawan b on b.nik = \"A\".\"UID\" and b.kode_lokasi = \"A\".\"USERLOC\" "+
                          " order by \"A\".\"TIMEIN\" desc, \"A\".\"UID\"",1,this.pager);
 
        this.page = 1;                                  
                     
    }
});
