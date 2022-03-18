window.app_saku3_transaksi_yspt_simak_fGaleri = function(owner)
{
	if (owner)
	{
		window.app_saku3_transaksi_yspt_simak_fGaleri.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku3_transaksi_yspt_simak_fGaleri";
		this.itemsValue = new arrayList();
		this.maximize();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Galeri Siswa", 0);	
		
		uses("portalui_uploader;saiCBBL;saiEdit;datePicker;saiGrid;sgNavigator;pageControl;checkBox");
		uses("saiGrid",true);		

		this.cb_pp = new portalui_saiCBBL(this,{bound:[20,11,220,20],caption:"Sekolah",tag:2,readOnly:true, change:[this,"doChange"]});	

		this.pc1 = new pageControl(this,{bound:[20,12,1000,440], childPage:["Data Galeri","List Galeri"]});				
		this.sg1 = new saiGrid(this.pc1.childPage[1],{bound:[1,5,this.pc1.width-5,this.pc1.height-33],colCount:3,tag:9,
		            colTitle:["No Bukti","Tanggal","Keterangan"],
					colWidth:[[2,1,0],[300,100,100]],
					readOnly:true,
					dblClick:[this,"doDoubleClick"],autoAppend:false,defaultRow:1});		
		this.sgn1 = new portalui_sgNavigator(this.pc1.childPage[1],{bound:[1,this.pc1.height-25,this.pc1.width-1,25],buttonStyle:3,grid:this.sg1,pager:[this,"doPager"]});
		this.bLoad1 = new portalui_imageButton(this.sgn1,{bound:[this.sgn1.width - 25,2,22,22],image:"icon/"+system.getThemes()+"/reload.png", hint:"Load List",click:[this,"doLoad"]});

		this.e_nb = new portalui_saiLabelEdit(this.pc1.childPage[0],{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this.pc1.childPage[0],{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.l_tgl1 = new portalui_label(this.pc1.childPage[0],{bound:[20,16,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this.pc1.childPage[0],{bound:[120,16,98,18],selectDate:[this,"doSelectDate"]}); 		
		this.cb_kelas = new portalui_saiCBBL(this.pc1.childPage[0],{bound:[20,13,220,20],caption:"Kelas",multiSelection:false,tag:1,change:[this,"doChange"]});	
		this.e_ket = new saiLabelEdit(this.pc1.childPage[0],{bound:[20,14,500,20],caption:"Keterangan",tag:1});
		
		this.pc2 = new pageControl(this.pc1.childPage[0],{bound:[1,18,995,315], childPage:["File Dokumen"]});
		this.sgUpld = new saiGrid(this.pc2.childPage[0],{bound:[1,5,this.pc2.width-5,this.pc2.height-35],colCount:2,
					    colTitle:["Path File","Upload"],
					    colWidth:[[1,0],[100,550]], 
						colFormat:[[1],[cfUpload]], 
						readOnly:true,change:[this,"doGridChange"],rowCount:1,tag:1});
		this.sgUpld.setUploadParam([1],"uploadTo", "server/media/", "object","server/media/");		
		this.sgnUpld = new sgNavigator(this.pc2.childPage[0],{bound:[1,this.pc2.height - 25,this.pc2.width-1,25],buttonStyle:1, grid:this.sgUpld});


		this.rearrangeChild(10, 23);
		this.pc1.childPage[0].rearrangeChild(10, 23);

		setTipeButton(tbAllFalse);
				
		this.setTabChildIndex();
		try {
			this.fileUtil = new util_file();
			this.fileUtil.addListener(this);
			this.rootDir = this.app._rootDir;
			this.separator = "/";	

			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();			
						
			this.stsSimpan = 1;
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);

			this.cb_pp.setSQL("select kode_pp, nama from pp where kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.app._kodePP+"'",["kode_pp","nama"],false,["Kode","Nama"],"and","Data PP",true);
			this.cb_pp.setText(this.app._kodePP);
			
			this.cb_kelas.setSQL("select kode_kelas, nama from sis_kelas where kode_pp='"+this.app._kodePP+"' and kode_lokasi = '"+this.app._lokasi+"' union select '-','-' ",["kode_kelas","nama"],false,["Kode Kelas","Nama"],"and","Data Kelas",true);			
			this.cb_kelas.setText("-");

			var data = this.dbLib.getDataProvider("select kode_ta from sis_ta where flag_aktif='1' and kode_lokasi='"+this.app._lokasi+"' and kode_pp='"+this.cb_pp.getText()+"' ",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.kodeTA = line.kode_ta;
			}

		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku3_transaksi_yspt_simak_fGaleri.extend(window.childForm);
window.app_saku3_transaksi_yspt_simak_fGaleri.implement({	
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

					if (this.stsSimpan == 0) {
						sql.add("delete from sis_galeri where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
						for (var i in this.listFiles.objList) {
							var ketemu = false;
							for (var j=0;j < this.sgUpld.getRowCount();j++){
								ketemu = i == this.sgUpld.cells(0,j);
								if (ketemu) break;
							}
							if (!ketemu) this.deletedFiles += this.rootDir+"/"+this.sgUpld.columns.get(1).param2 + i;
						}

					}
									
					for (var i=0;i < this.sgUpld.getRowCount();i++){
						if (this.sgUpld.rowValid(i)){							
							sql.add("insert into sis_galeri(no_bukti,kode_pp,kode_lokasi,kode_kelas,tanggal,keterangan,foto,tgl_input,nik_user,kode_ta) values "+
						    		"('"+this.e_nb.getText()+"','"+this.cb_pp.getText()+"','"+this.app._lokasi+"','"+this.cb_kelas.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.sgUpld.cells(1,i).tmpfile+"',getdate(),'"+this.app._userLog+"','"+this.kodeTA+"')");
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
				if (modalResult == mrOk) this.standarLib.clearByTag(this, new Array("0","1"),this.cb_kode);
				setTipeButton(tbAllFalse);				
				this.pc1.setActivePage(this.pc1.childPage[0]);	
				this.pc2.setActivePage(this.pc2.childPage[0]);	
				this.sgUpld.clear(1);	
				this.doClick();			
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
	hapus: function(){			
		try{						
			if (this.standarLib.checkEmptyByTag(this, [0,1])){
				try {									
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from sis_galeri where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"'");
					
					for (var i in this.listFiles.objList) {
						var ketemu = false;
						for (var j=0;j < this.sgUpld.getRowCount();j++){
							ketemu = i == this.sgUpld.cells(0,j);
							if (ketemu) break;
						}
						if (!ketemu) this.deletedFiles += this.rootDir+"/"+this.sgUpld.columns.get(1).param2 + i;
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

	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.periode = y+""+m;
		else this.periode = this.app._periode;
		if (this.stsSimpan == 1) this.doClick(this.i_gen);
	},

	doClick:function(sender){
			this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"sis_galeri","no_bukti",this.app._lokasi+"-GAL"+this.periode.substr(2,4)+".","0000"));
			this.stsSimpan = 1;
			setTipeButton(tbSimpan);
	},
	doGridChange: function(sender, col, row,param1,result, data){
	    try{        	
			if (sender == this.sgUpld && col == 1){ 
				if (this.uploadedFiles == undefined) this.uploadedFiles = "";
				if (this.uploadedFiles != "") this.uploadedFiles +=";";
				this.uploadedFiles+= this.rootDir+"/"+this.sgUpld.columns.get(1).param2 + data.tmpfile;
                this.sgUpld.cells(0,row, data.tmpfile);                
            }
         }catch(e){
            alert(e+" "+data);
         }
    },
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (Kode : "+ this.e_nb.getText()+")");							
							this.app._mainForm.bClear.click();

							this.fileUtil.deleteFiles(this.deletedFiles);
							this.uploadedFiles = "";
							this.deletedFiles = "";

						}else system.info(this,result,"");
	    			break;	      		
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	},


	doLoad:function(sender){								
		var strSQL = "select distinct no_bukti,tanggal,keterangan from sis_galeri where kode_lokasi='"+this.app._lokasi+"' group by no_bukti,tanggal,keterangan";		
		var data = this.dbLib.getDataProvider(strSQL,true);		
		if (typeof data == "object" && data.rs.rows[0] != undefined){
			this.dataJU = data;
			this.sgn1.setTotalPage(Math.ceil(data.rs.rows.length/this.app._pageRow));
			this.sgn1.rearrange();
			this.doTampilData(1);
		} else this.sg1.clear(1);			
	},
	
	doTampilData: function(page) {
		this.sg1.clear();
		var line;
		this.page = page;
		var start = (page - 1) * this.app._pageRow;
		var finish = (start + this.app._pageRow > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+this.app._pageRow);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];													
			this.sg1.appendData([line.no_bukti,line.tanggal,line.keterangan]); 
		}
		this.sg1.setNoUrut(start);		
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},


	doDoubleClick: function(sender, col , row) {
		try{
			if (this.sg1.cells(0,row) != "") {		
				this.stsSimpan = 0;	
				setTipeButton(tbUbahHapus);
				this.pc1.setActivePage(this.pc1.childPage[0]);														
				this.pc2.setActivePage(this.pc2.childPage[0]);														
				this.e_nb.setText(this.sg1.cells(0,row));			
						
				var data = this.dbLib.getDataProvider("select keterangan,tanggal,kode_pp,kode_kelas,foto from sis_galeri where no_bukti = '"+this.e_nb.getText()+"' and kode_lokasi='"+this.app._lokasi+"' ",true);
				this.deleteFiles = [];
				this.listFiles = new arrayMap();	
				if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sgUpld.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];	
					this.cb_pp.setText(line.kode_pp);
					this.cb_kelas.setText(line.kode_kelas);	
					this.e_ket.setText(line.keterangan);
					this.dp_d1.setText(line.tanggal);
					
					this.listFiles.set(line.foto,line.foto); 										
					this.sgUpld.appendData([line.foto, {filedest:line.foto, tmpfile:line.foto}]);
				}
			} else this.sgUpld.clear(1);				
						
			}
		} catch(e) {alert(e);}
	},

});
