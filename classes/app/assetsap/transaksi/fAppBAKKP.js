/**
 * @author dweexfuad
 */
window.app_assetsap_transaksi_fAppBAKKP = function(owner) {
	if (owner){
		window.app_assetsap_transaksi_fAppBAKKP.prototype.parent.constructor.call(this,owner);
		this.maximize();
		this.className  = "app_assetsap_transaksi_fAppBAKKP";		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Approval BA KKP ", 0);	
		uses("datePicker;saiCBBL");
		this.l_tgl = new label(this,{bound:[20,1,100,20],caption:"Tanggal",underline:true});
		this.dp_tgl = new datePicker(this,{bound:[120,1,100,18], selectDate:[this,"doSelectedDate"]});
		this.ed_lokfa = new saiCBBL(this, {
			bound: [20, 30, 200, 20],
			caption: "Bus. Area",
			multiSelection: false,
			text:this.app._kodeLokfa,
			rightLabel:this.app._namaLokfa,						
			sql:["select kode_lokfa, nama from amu_lokasi where kode_lokasi = '"+this.app._lokasi+"' and  kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U"? this.app._kodeLokfa : "%")+"' ", ["kode_lokfa","nama"],false, ["Lokasi","Nama Lokasi"],"and","Data Area Bisnis",true],
			change:[this,"doChange"]		
		});
		this.ed_kode = new saiLabelEdit(this,{bound:[20,2,250,20],caption:"No App",readOnly:true});
		this.bGen = new button(this,{bound:[250,2,60,20],caption:"Generate",click:"doClick"});											
		this.ed_ba = new saiCBBL(this, {
			bound: [20, 4, 200, 20],
			caption: "No BA",
			multiSelection: false,
			change:[this,"doChange"]					
		});
		this.ed_jenis = new saiCB(this,{bound:[20,10,200,20], caption:"Jenis",text:"TB", items:["TB","NTB"], change:[this,"doChange"]});				
		this.ed_nik1 = new saiCBBL(this, {
			bound: [20, 3, 200, 20],
			caption: "Pemeriksa",
			multiSelection: false,
			sql:["select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' ", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true]
		});
		this.ed_nik2 = new saiCBBL(this, {
			bound: [20, 4, 200, 20],
			caption: "Pembuat",
			multiSelection: false,
			sql:["select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' ", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true]
		});				
		this.ed_tempat = new saiLabelEdit(this, {
			bound: [20, 6, 500, 50],
			caption: "Tempat",
			maxLength: 150
		});		
		this.ed_alamat = new saiLabelEdit(this, {
			bound: [20, 7, 500, 50],
			caption: "Alamat",
			maxLength: 150
		});		
		this.ed_ket = new saiMemo(this, {
			bound: [20, 9, 500, 50],
			caption: "Keterangan",
			maxLength: 150
		});
		this.bTampil = new button(this, {
			bound: [540, 9, 80, 20],
			caption: "Tampil",
			click:[this,"doTampil"]
		});
		this.p1 = new pageControl(this,{bound:[20,11,600,230],childPage:["Data Asset","Data Aset Anomali"]});
		this.sg = new saiGrid(this.p1.childPage[0], {
			bound: [1, 20, 596, 180],
			colCount: 4,
			colTitle: ["Kode Status","Nama Status","Jumlah Kartu Asset","Nilai Buku"],
			colWidth: [[3,2,1,0],[120,120,200,100]],
			colReadOnly:[true,[0,1,2,3],[]],			
			rowCount: 1,
			tag: 9,						
			colFormat:[[3],[cfNilai]]			
		});		
		this.sgn = new sgNavigator(this.p1.childPage[0], {
			bound: [1, this.p1.height - 25, 596, 25],
			buttonStyle: 3,
			grid: this.sg,
			pager:[this,"doPager"]
		});		
		
		this.sg2 = new saiGrid(this.p1.childPage[1], {
			bound: [1, 20, 596, 180],
			colCount: 9,
			colTitle: "NKA,SN,Class Aset,Deskripsi,Deskripsi Alamat,Tgl Perolehan,Nilai,Nilai AP, Nilai Buku",
			colWidth: [[8,7,6,5,4,3,2,1,0],[100,100,100,100,150,150,120,50,120]],
			colReadOnly:[true,[0,1,2,3],[]],			
			rowCount: 1,
			tag: 99,						
			colFormat:[[3],[cfNilai]]			
		});		
		this.sgn2 = new sgNavigator(this.p1.childPage[1], {
			bound: [1, this.p1.height - 25, 596, 25],
			buttonStyle: 3,
			grid: this.sg2,
			pager:[this,"doPager"]
		});
		this.rearrangeChild(10,23);			
		this.p1.childPage[1].rearrangeChild(5,23);
		this.p1.childPage[0].rearrangeChild(5,23);												
		
		this.setTabChildIndex();
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		setTipeButton(tbSimpan);
					
		this.onClose.set(this,"doClose");		
		this.doChange(this.ed_lokfa);		
		this.ed_nik1.setText(this.app._userLog);
	}
};
window.app_assetsap_transaksi_fAppBAKKP.extend(window.childForm);
window.app_assetsap_transaksi_fAppBAKKP.implement({
	doClose: function(sender){				
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
	doModalResult: function(event, result){				
		try{
			if (result != mrOk) return;
			var sql = new server_util_arrayList();			
			switch(event){
				case "clear" :
					if (result == mrOk){
						this.standarLib.clearByTag(this, new Array("0","1","9"),this.ed_kode);		
						this.ed_lokfa.setText(this.app._kodeLokfa);
						this.sg.clear(1);						
						this.ed_jenis.setText("TB");
						this.ed_ket.setText('-');
						this.ed_nik1.setText(this.app._userLog);
						
					}
					
				break;
				case "simpan" :
					this.doClick();					
					if (this.standarLib.checkEmptyByTag(this,[0,1,2])){												
						sql.add("insert into amu_appbakkp (no_app, tanggal, kode_lokfa, nik_app, periode, no_ba, kode_lokasi, tgl_input, nik_user)values"+
							"('"+this.ed_kode.getText()+"', '"+this.dp_tgl.getDateString() +"','"+this.ed_lokfa.getText()+"','"+this.ed_nik1.getText()+"','"+this.app._periode+"','"+this.ed_ba.getText()+"','"+this.app._lokasi+"',now(),'"+this.app._userLog+"')");						
						sql.add("update amu_ba_m set progress = '1' where no_ba = '"+this.ed_ba.getText()+"'");
						this.dbLib.execArraySQL(sql);											
					}
				break;
				case "ubah" :
					
				break;
				case "delete" :
					
				break;
			}			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doSelectedDate: function(sender, y, m, d){       
    },
	doFindBtnClick: function(sender){
				
	},
	doChange: function(sender){
		try{
			if (sender == this.ed_jenis){
				this.sg.clear();
				this.sg2.clear();
				if (this.ed_jenis.getText() == "NTB"){
					this.sg2.setColCount(7);
					this.sg2.setColTitle("Alamat, Jml Fisik, No Label, Status, Ket. Status, Update Deskripsi / Update Lokasi, Keterangan ");
					this.sg2.setColWidth([6,5,4,3,2,1,0],[250,250,150,80,120,80,150]);
				}else{
					this.sg2.setColCount(9);
					this.sg2.setColTitle("Alamat, Jml Fisik, No Label, Status, Ket. Status, No Sertifikat/IMB/PBB/DLL, Luas,Update Deskripsi / Update Lokasi, Keterangan ");
					this.sg2.setColWidth([8,7,6,5,4,3,2,1,0],[250,250,100,150,150,80,120,80,150]);
				}
			}
			if (sender == this.ed_lokfa){
				this.sg.clear(1);							
				this.sg2.clear(1);	
				this.ed_nik1.clear();
				this.ed_nik1.setSQL("select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' and  kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U"? sender.getText() : "%")+"' ", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true);											
				this.ed_ba.setSQL("select no_ba, keterangan from amu_ba_m where kode_lokasi = '"+this.app._lokasi+"' and kode_lokfa = '"+this.ed_lokfa.getText()+"' and jenis_ba='REKON' and progress = '0' and  kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U"? sender.getText() : "%")+"' ", ["no_ba","keterangan"],false, ["No BA","Keterangan"],"and","Data Berita Acara Regional",true);											
				this.doClick();
			}			
			if (sender == this.ed_ba){
				var data = this.dbLib.getMultiDataProvider(new server_util_arrayList({items:[
					"select no_ba,kode_lokasi, kode_lokfa, tgl_ba,tgl_inv_mulai, tgl_inv_selesai,  nik_user, tgl_input, keterangan, nik_app1, nik_app2, nik_app3, jenis, periode, jenis_ba, alamat, tempat from amu_ba_m where no_ba = '"+this.ed_ba.getText()+"'",
					"select a.kode_status, c.nama, jml, nilai_buku from amu_ba_d a inner join amu_ba_m b on b.no_ba = a.no_ba  "+
						" inner join amu_status c on c.kode_status = a.kode_status and c.jenis = b.jenis "+
						"	where a.no_ba = '"+this.ed_ba.getText()+"' order by a.kode_status "
				]}), true);
				if (typeof data != "string"){
					if (data.result[0].rs.rows[0] != undefined){
						var line = data.result[0].rs.rows[0];
						this.ed_jenis.setText(line.jenis);
						this.ed_nik2.setText(line.nik_app1);
						this.ed_tempat.setText(line.tempat);
						this.ed_alamat.setText(line.alamat);
						this.ed_ket.setText(line.keterangan);
						this.sg.clear();
						this.sg2.clear();
						
						for (var i in data.result[1].rs.rows){
							line = data.result[1].rs.rows[i];
							this.sg.appendData([line.kode_status, line.nama, floatToNilai(line.jml), floatToNilai(line.nilai_buku)]);
						}
					}
				}else error_log(data);
			}
		}catch(e){
			alert(e);
		}
	},
	doClick: function(sender){
		if (sender == this.bGen)
			this.ed_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'amu_appbakkp','no_app',"APPBA"+this.ed_lokfa.getText()+"."+this.dp_tgl.getYear()+".",'0000'));
		if (sender == this.bCari && this.dataKKIL){
			var row;
			for (var i in this.dataKKIL.rs.rows){
				row = this.dataKKIL.rs.rows[i];				
				if (row.no_gabung.indexOf(this.eCari.getText()) > -1){
					var page = Math.ceil(i / this.rowPerPage);					
					if (page != this.page) this.doPager(this.sgn, page);
					this.sg.goToRow(i - ((page - 1) * this.rowPerPage) );
					return;
				}
			}
		}
	},
	doRequestReady: function(sender, methodName, result){		
		if (sender == this.dbLib)
		{
			try
			{   				
				switch(methodName)
	    		{
	    			case "execArraySQL" :	    				
						if (result.toLowerCase().search("error") == -1)					
						{							
							if (this.fromView) {
								this.app._mainForm.pButton.hide();
								this.formView.show();
								this.free();
								this.formView.refresh();
							}else{
								this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (ID : "+ this.ed_kode.getText()+")");
								this.app._mainForm.bClear.click();
                            }
						}else system.info(this,result,"");
	    			break;
	    			case "getDataProvider":
						eval("result = "+result+";");
						this.dataStatus = new arrayMap();
						for (var i in result.rs.rows){
							this.dataStatus.set(result.rs.rows[i].kode_status, result.rs.rows[i].nama);
						}
	    			break;
	    		}
			}
			catch(e)
			{
				systemAPI.alert("error = "+e,result);
			}
		}else if (sender == this.fileUtil){	        
        }
	},	
	doGridChange: function(sender, col, row,param1,result, data){	
		if (this.dataKKIL){
			if (col == 0){
				this.dataKKIL.rs.rows[(this.page - 1) * this.rowPerPage + row].status = sender.cells(0, row);
			}	
			if (col == 1){
				this.dataKKIL.rs.rows[(this.page - 1) * this.rowPerPage + row].catatan = sender.cells(1, row);
			}	
		}
    },	
	doTampil: function(sender){		
		try{
			if (sender == this.bTampil){
				this.dataKKIL = this.dbLib.getDataProvider("select distinct 'INPROG' as status,'-' as catatan,a.no_inv, date_format(a.tanggal,'%d-%m-%Y') as tanggal, b.no_gabung, b.no_fa, b.no_sn, c.nama, c.nama2, date_format(c.tgl_perolehan,'%d-%m-%Y') as tgl_perolehan, c.nilai, c.nilai_ap, c.nilai_buku, c.jml_fisik, a.nik_buat, d.nama as nmbuat, a.kode_lokfa2 "+
					" from amu_kkl_m a "+
					" 	inner join amu_kkl_d b on b.no_inv = a.no_inv "+
					" 	inner join amu_asset c on c.no_gabung = b.no_gabung "+
					"	left outer join amu_karyawan d on d.nik = a.nik_buat "+
					"where a.nik_app like '"+this.ed_nik1.getText()+"' and a.jenis = '"+this.ed_jenis.getText()+"' and a.progress = '0' and a.periode ='"+this.app._periode+"' and a.kode_lokfa = '"+this.ed_lokfa.getText()+"' and kode_lokfa2 like '"+this.ed_area.getText()+"%'", true);
				this.rowPerPage = 20;
				this.sgn.setTotalPage(Math.ceil(this.dataKKIL.rs.rows.length / this.rowPerPage));
				this.sgn.rearrange();
				this.doPager(this.sgn,1);
			}
			if (sender == this.bApp){				
				for (var i in this.dataKKIL.rs.rows){
					this.dataKKIL.rs.rows[i].status = 'APP';
				}
				this.doPager(this.sgn,this.page);
			}
			if (sender == this.bNApp){
				for (var i in this.dataKKIL.rs.rows){
					this.dataKKIL.rs.rows[i].status = 'NOTAPP';
				}
				this.doPager(this.sgn,this.page);				
			}
		}catch(e){
			alert(e);
		}
	},
	doPager: function(sender, page){
		if (this.dataKKIL){
			this.page = page;
			var start = (page - 1) * this.rowPerPage;
			var finish = (start + this.rowPerPage > this.dataKKIL.rs.rows.length ? this.dataKKIL.rs.rows.length : start + this.rowPerPage);
			var line;
			this.sg.clear();
			for (var i = start; i < finish; i++){
				line =  this.dataKKIL.rs.rows[i];
				this.sg.appendData([line.status, line.catatan,line.no_inv, line.tanggal, line.no_gabung, line.no_fa, line.no_sn, line.nama, line.nama2, line.tgl_perolehan, floatToNilai(line.nilai), floatToNilai(line.nilai_ap), floatToNilai(line.nilai_buku), floatToNilai(line.jml_fisik), line.nik_buat, line.nmbuat, line.kode_lokfa2]);
			}
			this.sg.setNoUrut(start);
		}
	},
	doSgClick: function(sender, col, row){
		var data = this.dbLib.getDataProvider("select a.alamat, a.jml_fisik, a.no_label, a.kode_status, b.nama, a.no_sertifikat, a.luas, a.ket_lokasi, a.keterangan from amu_kkl_d a  inner join amu_status b on b.kode_status = a.kode_status and b.jenis = '"+this.ed_jenis.getText()+"' where no_inv = '"+sender.cells(2,row)+"' ",true);
		var line;
		this.sg2.clear();
		for (var i in data.rs.rows){
			line = data.rs.rows[i];
			//Status, Ket. Status, Update Deskripsi / Update Lokasi, Keterangan
			if (this.ed_jenis.getText() == "TB")
				this.sg2.appendData([line.alamat, line.jml_fisik, line.no_label,  line.kode_status, line.nama, line.no_sertifikat, line.luas, line.ket_lokasi, line.keterangan]);
			else  this.sg2.appendData([line.alamat, line.jml_fisik, line.no_label,  line.kode_status, line.nama, line.ket_lokasi, line.keterangan]);
		}
	}
});
