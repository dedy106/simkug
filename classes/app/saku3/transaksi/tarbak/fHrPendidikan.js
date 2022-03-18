window.app_saku3_transaksi_tarbak_fHrPendidikan = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_tarbak_fHrPendidikan.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_tarbak_fHrPendidikan";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Data Pendidikan : Input/Edit", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		
		this.pc1 = new pageControl(this,{bound:[20,12,1000,450], childPage:["Daftar Pendidikan","Data Pendidikan","Filter Data"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[0],{bound:[1,5,this.pc1.width-5,this.pc1.height-30],colCount:2,tag:9,
		            colTitle:["NIK","Nama"],
					colWidth:[[1,0],[380,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[0],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		
		this.cb_kode = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,10,200,20],caption:"Kode",maxLength:10,change:[this,"doChange"]});;		
		this.e_nama = new saiLabelEdit(this.pc1.childPage[1],{bound:[20,11,400,20],caption:"Nama", maxLength:50, tag:1});	
		this.sg = new saiGrid(this.pc1.childPage[1],{bound:[0,5,this.pc1.width-5,this.pc1.height-90],colCount:9,tag:0,
		            colTitle:["Nama","Tahun","Kd Jur","Jurusan","Kd Str","Strata","Dokumen","Upload","File"],
					colWidth:[[8,7,6,5,4,3,2,1,0],[60,60,200,100,60,100,60,80,200]],
					defaultRow:1,
					columnReadOnly:[true,[2,3,4,5,6,7,8],[0,1]],
					colFormat:[[7],[cfUpload]], 
					buttonStyle:[[2,4],[bsEllips,bsEllips]],
					ellipsClick:[this,"doEllipsClick"],change:[this,"doGridChange"],
					click:[this,"doSgBtnClick"],
					autoAppend:true});
		this.sg.setUploadParam([7],"uploadTo", "server/media/", "object","server/media/");		
		this.sgn = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[0,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:2,grid:this.sg});
		
		this.e_kode2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,10,200,20],caption:"NIK",maxLength:10,tag:9});		
		this.e_nama2 = new saiLabelEdit(this.pc1.childPage[2],{bound:[20,12,300,20],caption:"Nama",maxLength:50,tag:9});		
		this.bLoad = new button(this.pc1.childPage[2],{bound:[120,11,80,18],caption:"Cari Data",click:[this,"doCari"]});
		
		this.rearrangeChild(10, 23);
		this.pc1.childPage[1].rearrangeChild(10, 23);		
		this.pc1.childPage[2].rearrangeChild(10, 23);
		setTipeButton(tbAllFalse);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doLoad();
			
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";				
						
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_tarbak_fHrPendidikan.extend(window.childForm);
window.app_saku3_transaksi_tarbak_fHrPendidikan.implement({
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
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try{									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from hr_pendidikan where nik = '"+this.cb_kode.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");			
					
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								sql.add("insert into hr_pendidikan(nik,kode_lokasi,nu,nama,tahun,setifikat,kode_jurusan,kode_strata) values "+
										"('"+this.cb_kode.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg.cells(0,i)+"',"+this.sg.cells(1,i)+",'"+this.sg.cells(7,i).tmpfile+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(4,i)+"')");
							}
						}
					}			
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
				if (modalResult == mrOk) {
					this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);
					setTipeButton(tbAllFalse);
					this.doLoad();
					this.sg.clear(1);
				}
				break;
			case "simpan" :	
				this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;
			case "ubah" :	
				this.ubah();
				break;				
			case "hapus" :	
				this.hapus();
				break;				
		}
	},
	doChange: function(sender){
		try{
			if (this.cb_kode.getText() != ""){
				var strSQL = "select a.*,b.nama as nama_jur,c.nama as nama_str "+
							 "from hr_pendidikan a "+
							 "inner join hr_jur b on a.kode_jurusan =b.kode_jur and a.kode_lokasi=b.kode_lokasi "+
							 "inner join hr_strata c on a.kode_strata =c.kode_strata and a.kode_lokasi=c.kode_lokasi "+
							 "where a.nik='"+this.cb_kode.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'";						   
				var data = this.dbLib.getDataProvider(strSQL,true);
				if (typeof data == "object" && data.rs.rows[0] != undefined){
					var line;
					this.sg.clear();
					for (var i in data.rs.rows){
						line = data.rs.rows[i];								
						this.sg.appendData([line.nama,line.tahun,line.kode_jurusan,line.nama_jur,line.kode_strata,line.nama_str,line.setifikat,{filedest:line.setifikat, tmpfile:line.setifikat},"OPEN"]);
					}
				} else this.sg.clear(1);
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tereksekusi (Kode : "+ this.cb_kode.getText()+")");							
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
				setTipeButton(tbSimpan);
				this.pc1.setActivePage(this.pc1.childPage[1]);														
				this.cb_kode.setText(this.sg1.cells(0,row));	
				this.e_nama.setText(this.sg1.cells(1,row));					
			}
		} catch(e) {alert(e);}
	},
	doLoad:function(sender){				
		if (this.app._userStatus == "A") var strSQL = "select a.nik,a.nama from hr_karyawan a where a.kode_lokasi='"+this.app._lokasi+"' order by a.tgl_masuk ";			
		else  var strSQL = "select a.nik,a.nama from hr_karyawan a where a.nik='"+this.app._userLog+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.tgl_masuk ";
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
		this.pc1.setActivePage(this.pc1.childPage[0]);
	},	
	doCari:function(sender){								
		if (this.e_kode2.getText() != "") var filter = " a.nik like '%"+this.e_kode2.getText()+"%' and a.kode_lokasi='"+this.app._lokasi+"' ";
		else var filter = " a.nama like '%"+this.e_nama2.getText()+"%' and a.kode_lokasi='"+this.app._lokasi+"' ";
		var strSQL = "select a.nik,a.nama "+
		             "from hr_karyawan a "+
					 "where "+filter+"  order by a.tgl_masuk";		
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/20));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
		this.pc1.setActivePage(this.pc1.childPage[0]);
	},
	doTampilData: function(page) {		
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg1.appendData([line.nik,line.nama]); 
		}
		this.sg1.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 2){
					this.standarLib.showListData(this, "Daftar Jurusan",sender,undefined, 
						    "select kode_jur,nama   from hr_jur where flag_aktif= '1' and kode_lokasi = '"+this.app._lokasi+"'",
							"select count(kode_jur) from hr_jur where flag_aktif= '1' and kode_lokasi = '"+this.app._lokasi+"'",
							["kode_jur","nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 4){
					this.standarLib.showListData(this, "Daftar Strata",sender,undefined, 
						    "select kode_strata,nama   from hr_strata where flag_aktif= '1' and kode_lokasi = '"+this.app._lokasi+"'",
							"select count(kode_strata)  from hr_strata where flag_aktif= '1' and kode_lokasi = '"+this.app._lokasi+"'",
							["kode_strata","nama"],"and",["Kode","Nama"],false);				
				}
			}
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doGridChange: function(sender, col, row,param1,result, data){
	    try{
        	if (sender == this.sg && col == 7){ 
				if (this.uploadedFiles == undefined) this.uploadedFiles = "";
				if (this.uploadedFiles != "") this.uploadedFiles +=";";
				this.uploadedFiles+= this.rootDir+"/"+this.sg.columns.get(7).param2 + data.tmpfile;
                this.sg.cells(6,row, data.tmpfile);                
				this.sg.cells(8,row, "-");                				
            }
         }catch(e){
            alert(e+" "+data);
         }
    },
	doSgBtnClick: function(sender, col, row){
		try{
			if (this.sg.cells(8,row) == "OPEN") window.open("server/media/"+this.sg.getCell(6,row));
		}catch(e){
			alert(e);
		}
	}	
});