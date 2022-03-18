window.app_saku2_transaksi_kopeg_barang_fSoP = function(owner)
{
	if (owner)
	{
		window.app_saku2_transaksi_kopeg_barang_fSoP.prototype.parent.constructor.call(this,owner);
		this.className  = "app_saku2_transaksi_kopeg_barang_fSoP";
		this.itemsValue = new portalui_arrayList();
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Form Stok Opname: Input", 0);	
		
		uses("portalui_saiCBBL;portalui_saiEdit;portalui_datePicker;portalui_saiGrid;portalui_sgNavigator;portalui_uploader");
		this.e_periode = new portalui_saiLabelEdit(this,{bound:[20,10,200,20],caption:"Periode",readOnly:true,tag:1});
		this.l_tgl = new portalui_label(this,{bound:[20,11,100,18],caption:"Tanggal", underline:true});
		this.dp_d1 = new portalui_datePicker(this,{bound:[120,11,98,18],selectDate:[this,"doSelectDate"]});
		this.e_nb = new portalui_saiLabelEdit(this,{bound:[20,12,200,20],caption:"No Bukti",maxLength:30,readOnly:true});
		this.i_gen = new portalui_imageButton(this,{bound:[225,12,20,20],hint:"Generate",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doClick"]});
		this.e_dok = new portalui_saiLabelEdit(this,{bound:[20,13,225,20],caption:"No Dokumen", maxLength:100});						
		this.e_ket = new portalui_saiLabelEdit(this,{bound:[20,14,503,20],caption:"Keterangan", maxLength:150});						
		this.cb_gudang = new portalui_saiCBBL(this,{bound:[20,16,200,20],caption:"Gudang",multiSelection:false,tag:1,change:[this,"doChange"]});
		this.e_total = new saiLabelEdit(this,{bound:[720,16,200,20],caption:"Total Selisih", tag:1, readOnly:true, tipeText:ttNilai, text:"0"});		
		this.i_Load = new portalui_imageButton(this,{bound:[600,16,20,20],hint:"Load Data Barang",image:"icon/"+system.getThemes()+"/tabCont2.png",click:[this,"doLoad"]});				
		this.bUpload = new portalui_uploader(this,{bound:[630,16,80,18],param3:"object",param4:"gridupload",afterUpload:[this,"doAfterUpload"],autoSubmit:true});
		
		this.p1 = new portalui_panel(this,{bound:[20,19,900,360],caption:"Item Barang"});
		this.sg = new portalui_saiGrid(this.p1,{bound:[0,20,895,340],colCount:9,tag:0,
		            colTitle:["Kode","Nama","Merk - Tipe","Satuan","Harga","Stok","Jumlah","Selisih","SubTtl"],
					colWidth:[[0,1,2,3,4,5,6,7,8],[80,180,200,50,60,60,60,60,80]],
					readOnly:true,
					colFormat:[[4,5,6,7,8],[cfNilai,cfNilai,cfNilai,cfNilai,cfNilai]],
					defaultRow:1,autoAppend:true});
		this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,333,900,25],buttonStyle:3,grid:this.sg,pager:[this,"doPager"]});
		
		this.rearrangeChild(10, 22);
		setTipeButton(tbSimpan);
		this.maximize();		
		this.setTabChildIndex();
		
		try{						
			this.sgn.uploader.setParam3("object");
			this.sg.setAllowBlank(true);
		
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			uses("util_standar");
			this.standarLib = new util_standar();
			this.doSelectDate(this.dp_d1,this.dp_d1.year,this.dp_d1.month,this.dp_d1.day);						
			
			this.cb_gudang.setSQL("select kode_gudang, nama from brg_gudang where kode_lokasi = '"+this.app._lokasi+"'",["kode_gudang","nama"],false,["Kode","Nama"],"and","Data Gudang",true);
			var data = this.dbLib.getDataProvider("select kode_spro,flag from spro where kode_spro in ('BRGPDPT','BRGHPP','BRGINV') and kode_lokasi = '"+this.app._lokasi+"'",true);			
			if (typeof data == "object"){
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];						
					if (line.kode_spro == "BRGINV") this.akunBarang = line.flag;			
					if (line.kode_spro == "BRGPDPT") this.akunPdpt = line.flag;			
					if (line.kode_spro == "BRGHPP") this.akunHpp = line.flag;			
				}
			}			
			
		}catch(e){
			systemAPI.alert(e);
		}
	}
};
window.app_saku2_transaksi_kopeg_barang_fSoP.extend(window.portalui_childForm);
window.app_saku2_transaksi_kopeg_barang_fSoP.implement({	
	doAfterUpload: function(sender, result, data){		
	    try{   			
			this.dataUpload = data;			
			for (var i=0;i < this.dataJU.rs.rows.length;i++){
				this.dataJU.rs.rows[i].jumlah=0;				
			}				
			var line; var line2;
			for (var i=0; i < this.dataUpload.rows.length;i++){
				line = this.dataUpload.rows[i];
				for (var j=0;j < this.dataJU.rs.rows.length;j++){
					if (line.kode_brg == this.dataJU.rs.rows[j].kode_brg) {
						this.dataJU.rs.rows[j].jumlah = parseFloat(line.jumlah);
						this.dataJU.rs.rows[j].selisih = parseFloat(line.jumlah) - this.dataJU.rs.rows[j].stok;
						this.dataJU.rs.rows[j].total = Math.round(this.dataJU.rs.rows[j].selisih * this.dataJU.rs.rows[j].h_avg);
					}
				}
			}
			var tot = 0;
			for (var i=0;i < this.dataJU.rs.rows.length;i++){
				line = this.dataJU.rs.rows[i];
				tot = tot + parseFloat(line.total);
			}
			this.e_total.setText(floatToNilai(tot));
			this.doTampilData(1);
   		}catch(e){
   		   this.sg.hideLoading();
   		   systemAPI.alert(e,"Proses Berhenti.");
        }
	},	
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
			if (this.standarLib.checkEmptyByTag(this, [0,2])){
				try{														
					this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"brg_sop_m","no_sop",this.app._lokasi+"-OPNM"+this.e_periode.getText().substr(2,4)+".","000"));
					uses("server_util_arrayList");
					var sql = new server_util_arrayList();										
					sql.add("insert into brg_sop_m(no_sop,kode_lokasi,tanggal,no_dokumen,keterangan,kode_gudang,periode,nik_user,tgl_input,nilai,posted) values "+						    
							"('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.dp_d1.getDateString()+"','"+this.e_dok.getText()+"','"+this.e_ket.getText()+"','"+this.cb_gudang.getText()+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),"+nilaiToFloat(this.e_total.getText())+",'F')");
					
					if (nilaiToFloat(this.e_total.getText()) > 0) {
						var akunDebet = this.akunBarang;
						var akunKredit = this.akunPdpt;
						var jenisD = 'BRG';
						var jenisK = 'PDPT';
					}
					else {
						var akunDebet = this.akunHpp;
						var akunKredit = this.akunBarang;
						var jenisD = 'BBN';
						var jenisK = 'BRG';
					}
					var nilai = Math.abs(nilaiToFloat(this.e_total.getText()));
					sql.add("insert into brg_sop_j(no_sop,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',0,'"+akunDebet+"','"+this.e_ket.getText()+"','D',"+nilai+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','BRGSOP','"+jenisD+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");
					sql.add("insert into brg_sop_j(no_sop,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs) values "+
							"('"+this.e_nb.getText()+"','"+this.e_dok.getText()+"','"+this.dp_d1.getDateString()+"',1,'"+akunKredit+"','"+this.e_ket.getText()+"','C',"+nilai+",'"+this.app._kodePP+"','-','"+this.app._lokasi+"','BRGSOP','"+jenisK+"','"+this.e_periode.getText()+"','"+this.app._userLog+"',getdate(),'IDR',1)");
										
					for (var i=0;i < this.dataJU.rs.rows.length;i++){
						var line = this.dataJU.rs.rows[i];						
						sql.add("insert into brg_sop_d(no_sop,kode_lokasi,periode,kode_brg,kode_gudang,satuan,harga,stok,jumlah,selisih,total) values "+
								"	('"+this.e_nb.getText()+"','"+this.app._lokasi+"','"+this.e_periode.getText()+"','"+line.kode_brg+"','"+this.cb_gudang.getText()+"','"+line.satuan+"',"+line.h_avg+","+line.stok+","+line.jumlah+","+line.selisih+","+line.total+")");
						
					}
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
					this.standarLib.clearByTag(this, new Array("0"),this.e_nb);		
					this.sg.clear(1);
					this.nik_user=this.app._userLog;								
					var sql = "call sp_brg_stok ('"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.nik_user+"')";
					this.dbLib.execQuerySync(sql);			
					var sql = "call sp_brg_tmp ('"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.nik_user+"')";
					this.dbLib.execQuerySync(sql);	
				}
				break;
			case "simpan" :				    
				if (parseFloat(this.app._periode) > parseFloat(this.e_periode.getText())){
					systemAPI.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh kurang dari periode aktif sistem.["+this.app._periode+"]");
					return false;
				}
				if (parseFloat(this.app._periode) < parseFloat(this.e_periode.getText())) {
					if (this.app._pernext == "1")
					  system.confirm(this, "simpancek", "Periode transaksi melebihi periode aktif sistem.["+this.app._periode+"]","Data akan disimpan?");
					else{
						systemAPI.alert(this,"Periode transaksi tidak valid.","Periode transaksi tidak boleh melebihi periode aktif sistem.["+this.app._periode+"]");
						return false;
					}
				}
				else this.simpan();
				break;
			case "simpancek" : this.simpan();			
				break;
		}
	},
	doClick:function(sender){
		this.e_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"brg_sop_m","no_sop",this.app._lokasi+"-OPNM"+this.e_periode.getText().substr(2,4)+".","000"));
		this.e_dok.setFocus();
	},	
	doChange:function(sender){
		this.sg.clear(1);
	},
	doSelectDate: function(sender, y,m,d){
		if (m < 10) m = "0" + m;			
		if (parseFloat(this.app._periode.substr(4,2)) <= 12) this.e_periode.setText(y+""+m);
		else {
			if (m == "12") this.e_periode.setText(this.app._periode);
			else this.e_periode.setText(y+""+m);
		}
		this.periodeBrg = this.e_periode.getText().substr(0,4)+"01";
		this.nik_user=this.app._userLog;								
		var sql = "call sp_brg_stok ('"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.nik_user+"')";
		this.dbLib.execQuerySync(sql);			
		var sql = "call sp_brg_tmp ('"+this.e_periode.getText()+"','"+this.app._lokasi+"','"+this.nik_user+"')";
		this.dbLib.execQuerySync(sql);	
		this.e_nb.setText("");
	},
	doLoad:	function(sender){
		if (this.cb_gudang.getText()!="") {	
			var strSQL = "select a.kode_brg,a.nama,a.merk+' - '+a.tipe as ket,a.satuan,b.h_avg,isnull(c.stok,0) as stok, 0 as jumlah,(0-isnull(c.stok,0)) as selisih,round((0-isnull(c.stok,0))*b.h_avg,0) as total "+
			             "from brg_m a inner join brg_tmp b on a.kode_brg=b.kode_brg and a.kode_lokasi=b.kode_lokasi "+
						 "             left join brg_stok c on a.kode_brg=c.kode_brg and a.kode_lokasi=c.kode_lokasi and c.kode_gudang='"+this.cb_gudang.getText()+"' "+
						 "where a.kode_lokasi='"+this.app._lokasi+"' ";
			var data = this.dbLib.getDataProvider(strSQL,true);
			if (typeof data == "object" && data.rs.rows[0] != undefined){
				this.dataJU = data;
				var line;				
				var tot = 0;
				for (var i=0;i < this.dataJU.rs.rows.length;i++){
					line = this.dataJU.rs.rows[i];
					tot = tot + parseFloat(line.total);
				}		
				this.e_total.setText(floatToNilai(tot));				
				this.sgn.setTotalPage(Math.ceil(data.rs.rows.length/20));
				this.sgn.rearrange();
				this.doTampilData(1);
			} else this.sg.clear(1);	
		}
		else {
			system.alert(this,"Gudang harus diisi.","Pilih dari daftar");
		}			
	},
	doTampilData: function(page) {
		var line;
		this.sg.clear();
		this.page = page;
		var start = (page - 1) * 20;
		var finish = (start + 20 > this.dataJU.rs.rows.length? this.dataJU.rs.rows.length:start+20);
		for (var i=start;i<finish;i++){
			line = this.dataJU.rs.rows[i];							
			this.sg.appendData([line.kode_brg,line.nama,line.ket,line.satuan,floatToNilai(line.h_avg),floatToNilai(line.stok),floatToNilai(line.jumlah),floatToNilai(line.selisih),floatToNilai(line.total)]);
		}
		this.sg.setNoUrut(start);
	},
	doPager: function(sender, page) {
		this.doTampilData(page);
	},
	doRequestReady: function(sender, methodName, result){
		if (sender == this.dbLib){
			try{   
				switch(methodName){
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1){
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (No : "+ this.e_nb.getText()+")");							
							this.app._mainForm.bClear.click();
						}else system.info(this,result,"");
	    			break;
	      		case "getMultiDataProvider":
						eval("result = "+result+";");
						if (typeof result != "string"){
							this.dataBrg = new portalui_arrayMap();							
							if (result.result[0]){
								var line;
								for (var i in result.result[0].rs.rows){
									line = result.result[0].rs.rows[i];
									this.dataBrg.set(line.kode_brg,line.nama);
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