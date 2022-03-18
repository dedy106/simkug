/**
 * @author dweexfuad
 */
window.app_assetsap_transaksi_fBARekon = function(owner) {
	if (owner){
		window.app_assetsap_transaksi_fBARekon.prototype.parent.constructor.call(this,owner);
		this.maximize();
		this.className  = "app_assetsap_transaksi_fBARekon";		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Berita Acara Rekonsiliasi hasil inventarisasi", 0);	
		uses("uploader;saiMemo;util_file;datePicker;uploader;checkBox");
		this.l_tgl = new label(this,{bound:[20,1,100,20],caption:"Tanggal",underline:true});
		this.dp_tgl = new datePicker(this,{bound:[120,1,100,18], selectDate:[this,"doSelectedDate"]});
		this.ed_kode = new saiLabelEdit(this,{bound:[20,2,200,20],caption:"No BA",readOnly:true});
		this.bGen = new button(this,{bound:[230,2,80,20],caption:"Generate",click:"doClick"});
		this.l_tgl = new label(this,{bound:[20,1,100,20],caption:"Tgl. Inv",underline:true});
		this.dp_tgl2 = new datePicker(this,{bound:[120,1,100,18], selectDate:[this,"doSelectedDate"]});		
		this.dp_tgl3 = new datePicker(this,{bound:[230,1,100,18], selectDate:[this,"doSelectedDate"]});
		this.l_tgl = new label(this,{bound:[20,2,100,20],caption:"Tgl. Rekon",underline:true});
		this.dp_tgl4 = new datePicker(this,{bound:[120,2,100,18], selectDate:[this,"doSelectedDate"]});		
		this.dp_tgl5 = new datePicker(this,{bound:[230,2,100,18], selectDate:[this,"doSelectedDate"]});		
		this.ed_jenis = new saiCB(this,{bound:[20,3,200,20], caption:"Jenis",items:["TB","NTB"]});
		this.ed_lokfa = new saiCBBL(this, {
			bound: [20, 30, 200, 20],
			caption: "Area Bisnis",
			multiSelection: false,
			text:this.app._kodeLokfa,
			rightLabel: this.app._namaLokfa,
			sql:["select kode_lokfa, nama from amu_lokasi where kode_lokasi = '"+this.app._lokasi+"' ", ["kode_lokfa","nama"],false, ["Lokasi","Nama Lokasi"],"and","Data Area Bisnis",true],
			change:[this,"doChange"]
		});		
		this.ed_nik1 = new saiCBBL(this, {
			bound: [20, 3, 200, 20],
			caption: "Officer",
			multiSelection: false,
			sql:["select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' ", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true]
		});
		this.ed_nik2 = new saiCBBL(this, {
			bound: [20, 4, 200, 20],
			caption: "Pemeriksa",
			multiSelection: false,
			sql:["select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' ", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true]
		});							
		this.ed_nik3 = new saiCBBL(this, {
			bound: [20, 5, 200, 20],
			caption: "Disetujui",
			multiSelection: false,
			sql:["select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' ", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true]
		});							
		this.ed_nik4 = new saiCBBL(this, {
				bound: [20, 6, 200, 20],
				caption: "Ketua TIM",
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
		this.p1 = new panel(this,{bound:[20,11,600,230],caption:"Data Asset"});
		this.sg = new saiGrid(this.p1, {
			bound: [1, 20, 898, 180],
			colCount: 4,
			colTitle: ["Kode Status","Nama Status","Jumlah Kartu Asset","Nilai Buku"],
			colWidth: [[3,2,1,0],[120,120,200,100]],
			colReadOnly:[true,[0,1,2,3],[]],			
			rowCount: 1,
			tag: 9,						
			colFormat:[[3],[cfNilai]]			
		});		
		this.sgn = new sgNavigator(this.p1, {
			bound: [1, this.p1.height - 25, 898, 25],
			buttonStyle: 3,
			grid: this.sg,
			pager:[this,"doPager"]
		});
		this.rearrangeChild(10,23);			
		this.setTabChildIndex();
		this.dbLib = new util_dbLib();
		this.dbLib.addListener(this);
		this.standarLib = new util_standar();
		setTipeButton(tbSimpan);						
		this.onClose.set(this,"doClose");
	}
};
window.app_assetsap_transaksi_fBARekon.extend(window.childForm);
window.app_assetsap_transaksi_fBARekon.implement({
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
						this.sg.clear(1);
					}
				break;
				case "simpan" :
					if (this.standarLib.checkEmptyByTag(this,[0,1,2])){
						this.doClick();
						sql.add("insert into amu_ba_m (no_ba,kode_lokasi, kode_lokfa, tgl_ba,tgl_inv_mulai, tgl_inv_selesai, tgl_rekon_mulai, tgl_rekon_selesai,  nik_user, tgl_input, keterangan, nik_app1, nik_app2, nik_app3, nik_app4,jenis, periode, jenis_ba, alamat, tempat)"+
							" values('"+this.ed_kode.getText()+"','"+this.app._lokasi+"','"+this.ed_lokfa.getText()+"','"+this.dp_tgl.getDateString()+"','"+this.dp_tgl2.getDateString()+"','"+this.dp_tgl3.getDateString()+"','"+this.dp_tgl4.getDateString()+"', '"+this.dp_tgl5.getDateString()+"', "+
							" '"+this.app._userLog+"',now(),'"+this.ed_ket.getText()+"','"+this.ed_nik1.getText()+"','"+this.ed_nik2.getText()+"','"+this.ed_nik3.getText()+"','"+this.ed_nik4.getText()+"','"+this.ed_jenis.getText()+"', '"+this.app._periode+"','REKON' , '"+this.ed_alamat.getText()+"','"+this.ed_tempat.getText()+"')");
						var line;
						for (var i=0;i < this.sg.getRowCount();i++){													
							sql.add("insert into amu_ba_d (no_ba, kode_lokasi, kode_status, jml, nilai_buku) "+
								" values('"+this.ed_kode.getText()+"','"+this.app._lokasi+"','"+this.sg.cells(0,i)+"','"+this.sg.cells(2,i)+"','"+parseNilai(this.sg.cells(3,i))+"') ");
						}
						for (var i in this.dataINV.rs.rows){
							line = this.dataINV.rs.rows[i];
							sql.add("insert into amu_ba_inv(no_ba, no_inv, no_gabung,jenis_ba)values('"+this.ed_kode.getText()+"','"+line.no_rekon+"','"+line.no_gabung+"','REKON') ");
						}
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
		if (sender == this.ed_lokfa){
			this.sg.clear(1);			
			this.ed_nik1.setSQL("select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' and kode_lokfa = '"+sender.getText()+"' ", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true);
			this.ed_nik2.setSQL("select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' and kode_lokfa = '"+sender.getText()+"' ", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true);
			this.ed_nik3.setSQL("select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' and kode_lokfa = '"+sender.getText()+"' ", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true);
			this.ed_nik4.setSQL("select nik, nama from amu_karyawan where kode_lokasi = '"+this.app._lokasi+"' and kode_lokfa like '"+(this.app._userStatus == "A" || this.app._userStatus == "U"? sender.getText() : "%")+"' ", ["nik","nama"],false, ["NIK","Nama"],"and","Data Karyawan",true);
		}	
		if (sender == this.ed_jenis){
			this.sg.clear(1);
		}	
	},
	doClick: function(sender){
		this.ed_kode.setText(this.standarLib.noBuktiOtomatis(this.dbLib,'amu_ba_m','no_ba',"BA.RKN/"+this.dp_tgl.getYear()+"/",'0000'));
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
							this.app._mainForm.pesan(2,"transaksi telah sukses tersimpan (ID : "+ this.ed_kode.getText()+")");
							this.app._mainForm.bClear.click();							                                                       
						}else system.info(this,result,"");
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
    },
	doTampil: function(sender){
		try {
			var data = this.dbLib.getMultiDataProvider(new server_util_arrayList({items:["select e.kode_status, e.nama, sum(case when f.no_gabung is null then 0 else 1 end) as jml, sum(ifnull(f.nilai_buku,0)) as buku "+
			" from amu_status e "+			
			" left outer join (select distinct b.status_final as kode_status, a.no_gabung, a.nilai_buku from amu_asset a  "+
			"	inner join amu_rekon_d b on a.no_gabung = b.no_gabung and b.kode_lokasi = '" +this.app._lokasi +"'" +			
			"	inner join amu_rekon_m c on c.no_rekon = b.no_rekon and a.kode_lokasi = b.kode_lokasi and c.jenis = '"+this.ed_jenis.getText()+"' and c.tanggal between "+this.dp_tgl2.getDateString()+" and "+this.dp_tgl3.getDateString()+" " +			
			"	inner join amu_lokasi h on h.kode_lokfa = a.kode_lokfa and h.kode_lokasi = a.kode_lokasi "+
			"	inner join amu_lokasi i on i.kode_lokfa = h.kode_induk and i.kode_lokasi = a.kode_lokasi and i.kode_induk = '00' "+
			
			"	left outer join amu_ba_inv d on d.no_inv = c.no_rekon and d.no_gabung = a.no_gabung and d.jenis_ba = 'REKON' "+
			"	left outer join amu_ba_m e on e.no_ba = d.no_ba and e.periode = a.periode and e.jenis_ba = 'REKON'"+
			"	where i.kode_lokfa = '"+this.ed_lokfa.getText()+"'  and d.no_gabung is null "+
			"	union "+
			" select distinct b.status_final as kode_status, a.no_gabung, a.nilai_buku from amu_asset a  "+
			"	inner join amu_rekon_d b on a.no_gabung = b.no_gabung and b.kode_lokasi = '" +this.app._lokasi +"'" +			
			"	inner join amu_rekon_m c on c.no_rekon = b.no_rekon and a.kode_lokasi = b.kode_lokasi and c.jenis = '"+this.ed_jenis.getText()+"' and c.tanggal between "+this.dp_tgl2.getDateString()+" and "+this.dp_tgl3.getDateString()+" " +			
			"	inner join amu_lokasi h on h.kode_lokfa = a.kode_lokfa and h.kode_lokasi = a.kode_lokasi and h.kode_induk = '00'  "+						
			"	left outer join amu_ba_inv d on d.no_inv = c.no_rekon and d.no_gabung = a.no_gabung and d.jenis_ba = 'REKON' "+
			"	left outer join amu_ba_m e on e.no_ba = d.no_ba and e.periode = a.periode and e.jenis_ba = 'REKON' "+
			"	where h.kode_lokfa = '"+this.ed_lokfa.getText()+"'  and d.no_gabung is null "+
			" ) f on f.kode_status = e.kode_status "+
			" where e.jenis  = '"+this.ed_jenis.getText()+"' "+
			"group by e.kode_status, e.nama order by e.kode_status ",
			
			"select distinct c.no_rekon, b.no_gabung from amu_asset a  "+
			"	inner join amu_rekon_d b on a.no_gabung = b.no_gabung and b.kode_lokasi = '" +this.app._lokasi +"'" +			
			"	inner join amu_rekon_m c on c.no_rekon = b.no_rekon and a.kode_lokasi = b.kode_lokasi and c.jenis = '"+this.ed_jenis.getText()+"' and c.tanggal between "+this.dp_tgl2.getDateString()+" and "+this.dp_tgl3.getDateString()+" " +			
			"	left outer join amu_ba_inv d on d.no_inv = c.no_rekon and d.no_gabung = a.no_gabung and d.jenis_ba = 'REKON'  "+
			"	left outer join amu_ba_m e on e.no_ba = d.no_ba and e.periode = a.periode and e.jenis_ba = 'REKON'"+
			"	where a.kode_lokfa = '"+this.ed_lokfa.getText()+"' and d.no_gabung is null"]}), true);			
			this.sg.clear();			
			if (typeof data != "string") {
				this.dataINV = data.result[1];
				data = data.result[0];
				var line;
				for (var i in data.rs.rows){
					line = data.rs.rows[i];
					this.sg.appendData([line.kode_status, line.nama, line.jml, floatToNilai(line.buku)]);
				}
				this.sgn.setTotalPage(1);
				this.sgn.rearrange();									
			}
			else 
				systemAPI.alert(data);
		}catch(e){
			alert(e);
			
		}		
	},
	doPager: function(sender, page){
		this.doLoadData(page);
	},
	doLoadData: function(page){		
	}	
});
