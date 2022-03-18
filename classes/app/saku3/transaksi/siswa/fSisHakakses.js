window.app_saku3_transaksi_siswa_fSisHakakses = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_siswa_fSisHakakses.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_siswa_fSisHakakses";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","User Akses", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
        uses("saiGrid",true);		
        
        this.pc1 = new pageControl(this,{bound:[20,12,1000,430], childPage:["Daftar Hakakses","Data Hakakses"]});
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-35],colCount:3,tag:9,
		            colTitle:["Kode","Nama","Status Login"],
					colWidth:[[2,1,0],[100,200,80]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
                
        
        this.cb_kode = new saiCBBL(this.pc1.childPage[1],{bound:[20,15,220,20],caption:"User", multiSelection:false, maxLength:10, tag:2,change:[this,"doChange"]});
        
		this.e_pass = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,200,20],caption:"Password", password:true,maxLength:10});		
		this.c_status = new saiCB(this.pc1.childPage[1],{bound:[20,12,200,20],caption:"Status User",items:["Siswa","Administrator"],readOnly:true,tag:2});
        this.c_menu = new saiCB(this.pc1.childPage[1],{bound:[20,13,200,20],caption:"Menu",items:["SISWAWEB","SISWA_ADM"],readOnly:true,tag:2});
        this.e_foto = new saiLabelEdit(this.pc1.childPage[1], {bound:[20,18,300,20], caption:"Foto"});
		this.u_foto = new uploader(this.pc1.childPage[1], {bound:[320,18,80,20],param3: "object", param4 :"server/media/",param2 :"server/tmp/", param1 : "uploadTo",
				autoSubmit:true, afterUpload: [this, "doUploadFinish"], caption:"Browse"} )
        this.c_status2 = new saiCB(this.pc1.childPage[1],{bound:[20,19,200,20],caption:"Status",items:["1. AKTIF","0. NONAKTIF"], readOnly:true,tag:2});

        this.rearrangeChild(10, 22);
        this.pc1.childPage[1].rearrangeChild(10, 22);
        this.iFoto = new image(this.pc1.childPage[1], {bound:[620, this.c_status2.top, 200,220]});

		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;	
			
			this.standarLib = new util_standar();
			// this.doLoad();

            this.cb_kode.setSQL("select nis, nama from sis_siswa where kode_lokasi = '"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"' ",["nis","nama"],false,["NIS","Nama"],"and","Data Siswa ",true);	
			
			this.doLoad();
			
			this.stsSimpan = 1;

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_siswa_fSisHakakses.extend(window.childForm);
window.app_saku3_transaksi_siswa_fSisHakakses.implement({
    mainButtonClick: function(sender){
		if (sender == this.app._mainForm.bClear)
			system.confirm(this, "clear", "screen akan dibersihkan?","form inputan ini akan dibersihkan");	
		if (sender == this.app._mainForm.bSimpan)
			system.confirm(this, "simpan", "Apa data sudah benar?","data diform ini apa sudah benar.");	
		if (sender == this.app._mainForm.bEdit)
			system.confirm(this, "ubah", "Apa perubahan data sudah benar?","perubahan data diform ini akan disimpan.");	
		if (sender == this.app._mainForm.bHapus)
			system.confirm(this, "hapus", "Yakin data akan dihapus?","data yang sudah disimpan tidak bisa di<i>retrieve</i> lagi.");	
	},
	simpan: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try{								
					var sts_admin="";
					if (this.c_status.getText()=="Administrator") {sts_admin="A"};
					if (this.c_status.getText()=="Siswa") {sts_admin="S"};
					
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();

                    if (this.stsSimpan == 0){
                        sql.add("delete from sis_hakakses where nik = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
                    }
                    
					
					sql.add("insert into sis_hakakses (nik, pass, status_login, kode_lokasi, no_hp,kode_pp, tgl_selesai,flag_aktif,menu_mobile,tgl_input,nik_user,kode_menu,foto,path_view) values  "+
                            "	('"+this.cb_kode.getText()+"','"+this.e_pass.getText()+"','"+sts_admin+"','"+this.app._lokasi+"','-','"+this.app._kodePP+"',getdate(),'"+this.c_status.getText().substr(0,1)+"','-',getdate(),'"+this.app._userLog+"','"+this.c_menu.getText()+"','"+this.e_foto.getText()+"','DX15')");
                            
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from sis_hakakses where nik = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
									
					setTipeButton(tbAllFalse);
					this.dbLib.execArraySQL(sql);
				}
				catch(e){
					system.alert(this, e,"");
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return false;
		switch (event){
			case "clear" :
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0"),this.cb_kode);
					this.doLoad();
					setTipeButton(tbAllFalse);
				break;
			case "simpan" :	
			case "ubah" :	
				this.simpan();
                break;	
            case "simpancek" : this.simpan();			
				break;			
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doChange: function(sender){
		try{
			
			if (this.cb_kode.getText() != ""){
				var data = this.dbLib.getDataProvider("select a.nik,a.pass,a.status_login, a.no_hp,a.kode_pp,a.tgl_selesai, a.flag_aktif,a.menu_mobile, a.kode_menu, a.foto "+
						   "from sis_hakakses a "+
						   "inner join sis_siswa b on a.nik=b.nis and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp  "+
						   "where a.nik ='"+this.cb_kode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' ",true);
				
				if (typeof data == "object"){
					
					var line = data.rs.rows[0];							
					if (line != undefined){

						var sts_admin="";
						if (line.status_login=="A") {sts_admin="Administrator"};
                        if (line.status_login=="S") {sts_admin="Siswa"};
                        
						this.e_pass.setText(line.pass);
						if (line.status_login == "S") this.c_status.setText("Siswa");
						else this.c_status.setText("Administrator");
                        this.c_menu.setText(line.kode_menu);
                        if (line.flag_aktif == "0") this.c_status2.setText("0. NONAKTIF");
						else this.c_status2.setText("1. AKTIF");

                        var data2 = this.dbLib.getDataProvider("select a.foto "+
						   "from sis_siswa a "+
						   "where a.nis ='"+this.cb_kode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' ",true);
					  
						var line2 = data2.rs.rows[0];	

                        this.e_foto.setText(line2.foto);
						this.iFoto.setImage("server/media/"+trim(line2.foto));
						
					
                        this.stsSimpan = 0;
						setTipeButton(tbUbahHapus);
						
					}
					else{

						var data2 = this.dbLib.getDataProvider("select a.foto "+
						   "from sis_siswa a "+
						   "where a.nis ='"+this.cb_kode.getText()+"' and a.kode_lokasi = '"+this.app._lokasi+"' ",true);
					  
						var line2 = data2.rs.rows[0];	

                        this.e_foto.setText(line2.foto);
						this.iFoto.setImage("server/media/"+trim(line2.foto));
						
                        this.stsSimpan = 1;
						setTipeButton(tbSimpan);
					}
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},	
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.cb_kode.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
    },
    doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {			
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.cb_kode.setText(this.sg1.cells(0,row));				
			}
		} catch(e) {alert(e);}
	},
	doLoad:function(sender){	
	try {	
		var strSQL = "select a.nik,b.nama, case when a.status_login ='S' then 'Siswa' else 'Administrator' end as status_login "+
		             "from sis_hakakses a inner join sis_siswa b on a.nik=b.nis and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp   "+
					 "where a.kode_lokasi='"+this.app._lokasi+"' and a.kode_pp='"+this.app._kodePP+"' order by a.nik";	
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
		this.pc1.setActivePage(this.pc1.childPage[0]);
	} 
	catch(e) {
		alert(e);
	}
	},		
	doTampilData: function(page) {		
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];																
			this.sg1.appendData([line.nik,line.nama,line.status_login]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doUploadFinish: function(sender, result, data, filename){
		try{	
			
			if (result){			
				this.fileDest = data;
				this.iFoto.setImage(sender.param2+data.tmpfile);//,this.rootDir+"/"+sender.param2+urldecode(data));			
				this.iFoto.setProportional(true);
				this.e_foto.setText(trim(data.filedest) );
			}else system.alert(this,"Error upload","");
		}catch(e){
			system.alert(this,"Error upload",e);
		}
	}
});