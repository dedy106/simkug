window.app_saku2_transaksi_gar_fAbtE = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_gar_fAbtE.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_gar_fAbtE";
		this.itemsValue = new arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Penambahan Anggaran (ABT): Edit", 0);	
		
		uses("portalui_uploader;portalui_datePicker;portalui_saiCB;portalui_saiCBBL;portalui_pageControl;portalui_childPage;util_standar;portalui_saiGrid;portalui_sgNavigator");
		uses("portalui_saiGrid",true);		

		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,14,202,20],caption:"Periode",tag:2,readOnly:true,change:[this,"doChange"]});
		this.l_tgl1 = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,100,18],selectDate:[this,"doSelectDate"]}); 
		this.e_nb = new saiCBBL(this,{bound:[20,12,223,20],caption:"No Bukti", multiSelection:false, maxLength:10, tag:1, readOnly:true,change:[this,"doChange"]});				
		this.e_dok = new saiLabelEdit(this,{bound:[20,16,450,20],caption:"No Dokumen", maxLength:50});		
		this.e_ket = new saiLabelEdit(this,{bound:[20,17,450,20],caption:"Deskripsi", maxLength:150});		
		this.cb_buat = new saiCBBL(this,{bound:[20,16,200,20],caption:"NIK Pembuat", multiSelection:false, maxLength:10, tag:2});
		this.cb_app = new saiCBBL(this,{bound:[20,17,200,20],caption:"NIK Approve", multiSelection:false, maxLength:10, tag:2});		
		this.e_nilai = new saiLabelEdit(this,{bound:[700,17,220,20],caption:"Total ABT", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		
		this.p1 = new panel(this,{bound:[20,23,900,333],caption:"Data Item Penambahan Anggaran"});
		this.sg = new saiGrid(this.p1,{bound:[1,20,this.p1.width-5,this.p1.height-45],colCount:8,tag:0,
		            colTitle:["Kode Akun","Nama Akun","Kode PP","Nama PP","Kode DRK","Nama DRK","Periode","Nilai"],
					colWidth:[[7,6,5,4,3,2,1,0],[100,80,150,80,150,80,150,80]],
					columnReadOnly:[true,[1,3,5,6],[0,2,4,7]],
					buttonStyle:[[0,2,4,6],[bsEllips,bsEllips,bsEllips,bsAuto]], 
					colFormat:[[7],[cfNilai]],picklist:[[6],[new portalui_arrayMap({items:["01","02","03","04","05","06","07","08","09","10","11","12"]})]],
					ellipsClick:[this,"doEllipsClick"],change:[this,"doChangeCell"],nilaiChange:[this,"doNilaiChange"],
					checkItem:true,autoAppend:true,defaultRow:1});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[1,this.p1.height-25,this.p1.width-1,25],buttonStyle:bsAll,grid:this.sg});		
		
		this.rearrangeChild(10, 23);
					
		setTipeButton(tbUbahHapus);
		this.maximize();		
		this.setTabChildIndex();
		try {
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);
			
			this.cb_buat.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Pembuat",true);
			this.cb_app.setSQL("select nik, nama from karyawan where kode_lokasi='"+this.app._lokasi+"'",["nik","nama"],false,["NIK","Nama"],"and","Data NIK Approval",true);
			var data = this.dbLib.getDataProvider("select nik,nama from karyawan where nik='"+this.app._userLog+"' and kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_buat.setText(line.nik,line.nama);
			} else this.cb_buat.setText("","");
			var data = this.dbLib.getDataProvider("select a.flag,b.nama from spro a inner join karyawan b on a.flag=b.nik and a.kode_lokasi=b.kode_lokasi where kode_spro='GARAPP' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line = data.rs.rows[0];							
				this.cb_app.setText(line.flag,line.nama);
			} else this.cb_app.setText("","");
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_gar_fAbtE.extend(window.childForm);
window.app_saku2_transaksi_gar_fAbtE.implement({	
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
			if (this.standarLib.checkEmptyByTag(this, [0,1,2])){
				try{														
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();
					sql.add("delete from anggaran_m where no_agg = '"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
					sql.add("delete from anggaran_d where no_agg = '"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
					sql.add("delete from rra_pdrk_m where no_pdrk = '"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
					sql.add("delete from rra_pdrk_d where no_pdrk = '"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
					
					sql.add("insert into anggaran_m (no_agg,kode_lokasi,no_dokumen,tanggal,keterangan,tahun,kode_curr,nilai,tgl_input,nik_user,posted,no_del,nik_buat,nik_setuju,jenis) values  "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"','"+this.e_ket.getText()+"','"+this.e_periode.getText().substr(0,4)+"','IDR',"+parseNilai(this.e_nilai.getText())+",getdate(),'"+this.app._userLog+"','T','-','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','ABT')");
					
					sql.add("insert into rra_pdrk_m(no_pdrk,kode_lokasi,keterangan,kode_pp,kode_bidang,jenis_agg,tanggal,periode,nik_buat,nik_app1,nik_app2,nik_app3,sts_pdrk,justifikasi, nik_user, tgl_input,progress) values "+
						    "('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_ket.getText()+"','"+this.app._kodePP+"','-','-','"+this.dp_d1.getDateString()+"','"+this.e_periode.getText()+"','"+this.app._userLog+"','"+this.cb_buat.getText()+"','"+this.cb_app.getText()+"','"+this.cb_app.getText()+"','ABT','-','"+this.app._userLog+"',now(),'0')");
					var periode ="";
					if (this.sg.getRowValidCount() > 0){
						for (var i=0;i < this.sg.getRowCount();i++){
							if (this.sg.rowValid(i)){
								periode = this.e_periode.getText().substr(0,4)+this.sg.cells(6,i);
								sql.add("insert into rra_pdrk_d(no_pdrk,kode_lokasi,no_urut,kode_akun,kode_pp,kode_drk,periode,saldo,nilai,dc,target) values "+
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg.cells(0,i)+"','"+this.sg.cells(2,i)+"','"+this.sg.cells(4,i)+"','"+periode+"',"+parseNilai(this.sg.cells(7,i))+","+parseNilai(this.sg.cells(7,i))+",'D','-')");										
								/*
								sql.add("insert into anggaran_d (no_agg,kode_lokasi,no_urut,kode_pp,kode_akun,kode_drk,volume,periode,nilai_sat,nilai,dc,satuan,nik_user,tgl_input,modul) values "+		
										"('"+this.e_nb.getText()+"','"+this.app._lokasi+"',"+i+",'"+this.sg.cells(2,i)+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(4,i)+"',1,'"+periode+"',"+parseNilai(this.sg.cells(7,i))+","+parseNilai(this.sg.cells(7,i))+",'D','-','"+this.app._userLog+"',getdate(),'ABT')");
								*/
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
				if (modalResult == mrOk)
					this.standarLib.clearByTag(this, new Array("0","1"),this.e_nb);
					this.sg.clear(1); 
					setTipeButton(tbUbahHapus);
				break;
			case "ubah" :	
				this.app._periode = this.dbLib.getPeriode(this.app._lokasi);
				this.sg.validasi();
				if (nilaiToFloat(this.e_nilai.getText()) <= 0) {
					system.alert(this,"Transaksi tidak valid.","Total ABT tidak boleh nol atau kurang.");
					return false;						
				}
				if (this.app._periode.substr(0,4) > this.e_periode.getText().substr(0,4)){
					system.alert(this,"Periode transaksi tidak valid.","Periode transaksi harus dalam tahun anggaran yang sama.["+this.app._periode.substr(0,4)+"]");
					return false;
				}
				else this.simpan();
				break;				
			case "simpancek" : this.simpan();			
				break;			
			case "hapus" :	
				  this.app._periode = this.dbLib.getPeriode(this.app._lokasi);				
				  uses("server_util_arrayList");
				  var sql = new server_util_arrayList();
				  sql.add("delete from anggaran_m where no_agg = '"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
				  sql.add("delete from anggaran_d where no_agg = '"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
				  sql.add("delete from rra_pdrk_m where no_pdrk = '"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
				  sql.add("delete from rra_pdrk_d where no_pdrk = '"+this.e_nb.getText()+"' and kode_lokasi ='"+this.app._lokasi+"'");
				  setTipeButton(tbAllFalse);	
				  this.dbLib.execArraySQL(sql);				
				break;				
		}
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else this.e_periode.setText(this.app._periode);		
		var sql = new server_util_arrayList(); 
		sql.add("select kode_akun, nama from masakun where block='0' and kode_lokasi='"+this.app._lokasi+"'");
		sql.add("select kode_pp, nama from pp where tipe='posting' and kode_lokasi='"+this.app._lokasi+"' and flag_aktif ='1'");
		this.dbLib.getMultiDataProviderA(sql);							
	},	
	doChange:function(sender){
		if (sender == this.e_periode && this.e_periode.getText()!="") {			
			this.e_nb.setSQL("select a.no_agg, a.keterangan from anggaran_m a inner join rra_pdrk_m b on a.no_agg=b.no_pdrk where b.progress='0' and a.jenis = 'ABT' and a.tahun='"+this.e_periode.getText().substr(0,4)+"' and a.kode_lokasi='"+this.app._lokasi+"'",["a.no_agg","a.keterangan"],false,["No Bukti","Deskripsi"],"and","Daftar Bukti",true);
		}
		
		if (sender == this.e_nb && this.e_nb.getText()!="") {
			var data = this.dbLib.getDataProvider("select * from anggaran_m a where a.no_agg='"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"'",true);
			if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined){					
					this.dp_d1.setText(line.tanggal);					
					this.e_dok.setText(line.no_dokumen);
					this.e_ket.setText(line.keterangan);
					this.cb_buat.setText(line.nik_buat);
					this.cb_app.setText(line.nik_setuju);
				} 
			}						
			var data = this.dbLib.getDataProvider(
						"select a.kode_akun,b.nama as nama_akun,a.kode_pp,c.nama as nama_pp,a.kode_drk,isnull(d.nama,'-') as nama_drk,a.periode,a.nilai "+
						"from rra_pdrk_d a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi "+
						"              	   inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi "+
						"                  left join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun='"+this.e_periode.getText().substr(0,4)+"' "+
						"where a.no_pdrk = '"+this.e_nb.getText()+"' and a.kode_lokasi='"+this.app._lokasi+"' order by a.kode_akun",true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				var line;
				this.sg.clear();
				for (var i in data.rs.rows){
					line = data.rs.rows[i];							
					this.sg.appendData([line.kode_akun,line.nama_akun,line.kode_pp,line.nama_pp,line.kode_drk,line.nama_drk,line.periode.substr(4,2),floatToNilai(line.nilai)]);
				}
			} else this.sg.clear(1);								
		}	
	},
	doChangeCell: function(sender, col, row){
		if ((col == 7) && (this.sg.cells(7,row) != "")) this.sg.validasi();
		sender.onChange.set(undefined,undefined);
	    if (col == 0) {
			if (this.sg.cells(0,row) != "") {
				var akun = this.dataAkun.get(sender.cells(0,row));
				if (akun) sender.cells(1,row,akun);
				else {                                    
					if (trim(sender.cells(0,row)) != "") system.alert(this,"Kode Akun "+sender.cells(0,row)+" tidak ditemukan","Inputkan kode lainnya.","checkAkun");                
					sender.cells(0,row,"");
					sender.cells(1,row,"");
				}				
			}
		}
		if (col == 2) {
			if (this.sg.cells(2,row) != "") {
				var pp = this.dataPP.get(sender.cells(2,row));
				if (pp) sender.cells(3,row,pp);
				else {
					if (trim(sender.cells(2,row)) != "") system.alert(this,"Kode PP "+sender.cells(2,row)+" tidak ditemukan","Inputkan kode lainnya.","checkPP");                
					sender.cells(2,row,"");
					sender.cells(3,row,"");
				}				
			}
		}
		if (col == 4) {
			if (this.sg.cells(4,row) != "") {							
				var data = this.dbLib.getDataProvider("select nama from drk where kode_drk='"+this.sg.cells(4,row)+"' and tahun='"+this.e_periode.getText().substr(0,4)+"' and kode_lokasi='"+this.app._lokasi+"'",true);
				if (typeof data == "object"){
				var line = data.rs.rows[0];							
				if (line != undefined) this.sg.cells(5,row,line.nama);
				else {						
						this.sg.cells(4,row,"");
						this.sg.cells(5,row,"");
					}
				}
			}			
		}
		sender.onChange.set(this,"doChangeCell");		
	},
	doNilaiChange: function(){
		try{
			var tot = 0;
			for (var i = 0; i < this.sg.rows.getLength();i++){
				if (this.sg.rowValid(i) && this.sg.cells(7,i) != ""){
					tot += nilaiToFloat(this.sg.cells(7,i));
				}
			}
			this.e_nilai.setText(floatToNilai(tot));
		}catch(e)
		{
			alert("[app_saku_gl_transaksi_fJu2]::doNilaiChange:"+e);
		}
	},		
	doEllipsClick: function(sender, col, row){
		try{			
			if (sender == this.sg) {
				if (col == 0){
					this.standarLib.showListData(this, "Daftar Akun",sender,undefined, 
												  "select kode_akun,nama    from masakun where block= '0' and kode_lokasi = '"+this.app._lokasi+"'",
												  "select count(kode_akun)  from masakun where block= '0' and kode_lokasi = '"+this.app._lokasi+"'",
												  ["kode_akun","nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 2){
					this.standarLib.showListData(this, "Daftar PP/Unit",sender,undefined, 
												  "select kode_pp, nama  from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1'",
												  "select count(kode_pp) from pp where kode_lokasi = '"+this.app._lokasi+"' and tipe='posting' and flag_aktif ='1'",
												  ["kode_pp","nama"],"and",["Kode","Nama"],false);				
				}
				if (col == 4){
					this.standarLib.showListData(this, "Daftar DRK",sender,undefined, 
												  "select kode_drk, nama  from drk where kode_lokasi = '"+this.app._lokasi+"' and tahun='"+this.e_periode.getText().substr(0,4)+"' ",
												  "select count(kode_drk) from drk where kode_lokasi = '"+this.app._lokasi+"' and tahun='"+this.e_periode.getText().substr(0,4)+"' ",
												  ["kode_drk","nama"],"and",["Kode","Nama"],false);				
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
						if (result.toLowerCase().search("error") == -1){
							system.info(this,"Transaksi telah sukses tersimpan (No Bukti : "+ this.e_nb.getText()+")","");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	      			case "getMultiDataProvider":
	    			    eval("result = "+result+";");
	    			    if (typeof result != "string"){
                            this.dataAkun = new portalui_arrayMap();
							this.dataPP = new portalui_arrayMap();
	    			        if (result.result[0]){	    			        
	    			            var line;
	    			            for (var i in result.result[0].rs.rows){
	    			                line = result.result[0].rs.rows[i];
	    			                this.dataAkun.set(line.kode_akun, line.nama);
                                }
                            }
							if (result.result[1]){	    			        
	    			            var line;
	    			            for (var i in result.result[1].rs.rows){
	    			                line = result.result[1].rs.rows[i];
	    			                this.dataPP.set(line.kode_pp, line.nama);
                                }
                            }
                        }else throw result;
	    			break;
	    		}    		
			}
			catch(e){
				systemAPI.alert("step : "+step+"; error = "+e);
			}
	    }
	}
});