/**
 * @author dweexfuad
 */
window.app_budget_transaksi_fGajiTpkk = function(owner)
{
	if (owner)
	{
		window.app_budget_transaksi_fGajiTpkk.prototype.parent.constructor.call(this,owner);
		this.className  = "app_budget_transaksi_fGajiTpkk";
		this.setTop(60);
		this.setWidth(1280);
		this.setHeight(550);
		this.itemsValue = new portalui_arrayList();
		
		this.app._mainForm.childFormConfig(this, "mainButtonClick","Beban Honor TPKK", 0);	
		
//------------------------------------------------------------------------
		try{
			uses("portalui_saiCBBL;portalui_datePicker;portalui_checkBox;util_standar");
			this.eTahun = new portalui_saiLabelEdit(this,{bound:[20,21,182,20],caption:"Tahun",tipeText:ttAngka,maxLength:4, change:[this,"doEditChange"]});		
			this.ed_nb = new portalui_saiLabelEdit(this,{bound:[20,23,230,20],caption:"No Bukti", readOnly:true});					
			this.bGen = new portalui_button(this,{bound:[256,23,80,20],caption:"Gen",icon:"url(icon/"+system.getThemes()+"/process.png)",click:[this,"doClick"]});		   		
			this.cb_pp = new portalui_saiCBBL(this,{bound:[20,21,200,20], caption:"PP", multiSelection:false});
			
			this.bTampil = new portalui_button(this,{bound:[829,21,80,18],caption:"Tampil",click:[this,"doTampilClick"]});		
			this.p1 = new portalui_panel(this,{bound:[10,26,900,373],caption:"Daftar"});
			this.sg1 = new portalui_saiGrid(this.p1,{bound:[0,20,900,330]});		
			this.sgn = new portalui_sgNavigator(this.p1,{bound:[0,350,900,25],buttonStyle:3, grid:this.sg1, pager:[this,"doPager"], readOnly:true});		
			this.sg1.setColCount(14);
			var hint = ["Kode Ruang","Nama","Job Status","Band","Loker","TPK","HONOR DOKTER TPKK","DOKTER PJ TPKK","INSENTIF DOKTER TPKK","FASKES","THT","PELATIHAN DOKTER TPKK","HONOR MIRYA","Jumlah"];				
			this.sg1.setColWidth([1,4],[200,200]);
			this.sg1.setColTitle(hint);
			this.colTitle = hint;
			this.rearrangeChild(10,23);
			setTipeButton(tbSimpan);
			
			this.maximize();		
			this.setTabChildIndex();				
			this.dbLib = new util_dbLib();
			this.dbLib.addListener(this);
			this.standarLib = new util_standar();					
			
			var data = this.dbLib.getDataProvider("select year(getdate()) +1 as tahun ");
			eval("data = "+data+";");
			if (typeof data == "object"){
				var line;
				line = data.rs.rows[0];							
				this.eTahun.setText(line.tahun);
			}
			var data = this.dbLib.getDataProvider("select progress from agg_close where kode_lokasi = '"+this.app._lokasi+"' and modul = 'YANKESTA' and tahun = '"+this.eTahun.getText()+"'",true);
			if (typeof data == "object"){
				this.prog = data.rs.rows[0].progress;
			}

			this.cb_pp.setSQL("select kode_pp, nama from agg_pp where tipe = 'posting' and kode_lokasi = '"+this.app._lokasi+"' ",["kode_pp","nama"],undefined,["Kode","Nama"],"and","Data PP",false);
		}catch(e)
		{
			alert(e);
		}
	}
};
window.app_budget_transaksi_fGajiTpkk.extend(window.portalui_childForm);
//------------------------------------------------------------------ event
window.app_budget_transaksi_fGajiTpkk.implement({
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
	doModalResult: function(event, modalResult){
		if (modalResult != mrOk) return;
		try{
			
			switch (event)
			{
				case "clear" :
					break;
				case "simpan" :
						if (this.prog != "0") {
							system.alert(this,"Transaksi tidak valid.","Transaksi Honor TPKK telah di Close.");
							return false;
						} 

						uses("server_util_arrayList");
						var start,sql = new server_util_arrayList();		
						this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"agg_gajitpkk_m","no_gaji",this.app._lokasi+"-TPKK"+this.eTahun.getText().substr(0,2),"000"));
						
						sql.add("delete from agg_gajitpkk_m where kode_lokasi='"+this.app._lokasi+"' and tahun= '"+this.eTahun.getText()+"'");
						sql.add("delete from agg_gaji_tpkk where kode_lokasi='"+this.app._lokasi+"' and periode like '"+this.eTahun.getText()+"%'");
						sql.add("delete from agg_d where modul='BTPKK' and kode_lokasi='"+this.app._lokasi+"' and tahun= '"+this.eTahun.getText()+"' ");

						sql.add("insert into agg_gajitpkk_m(no_gaji,kode_lokasi,keterangan,tahun,jenis,tgl_input,nik_user) values "+
								"('"+this.ed_nb.getText()+"','"+this.app._lokasi+"','-','"+this.eTahun.getText()+"','X',now(),'"+this.app._userLog+"')");					
						
						for (var i in this.dataDokter.rs.rows){
							line = this.dataDokter.rs.rows[i];																				
							start = parseFloat(line.jml);							
							for (var c in this.colTitle){								
								if (parseFloat(line[this.colTitle[c]]) != 0){
									switch(this.dataParam.get(this.colTitle[c]).jns_periode.substr(0,1)){
										case "A":
											if (start < 0) start = 3 * Math.ceil(Math.abs(start) / 3)+ 1;
											else start = 1;										
											for (var b=start; b <= 12; b+=3)
												sql.add("insert into agg_gaji_tpkk(nik, kode_param, periode, jenis_agg, posted, kode_pp, nilai, no_gaji, kode_lokasi)"+
													" values('"+ line.kode_dokter +"','"+this.colTitle[c]+"','"+this.eTahun.getText()+( b < 10 ? "0":"")+b+"','"+line.jenis.substr(0,1)+"','F','"+this.cb_pp.getText()+"','"+line[this.colTitle[c].toLowerCase()]+"','"+this.ed_nb.getText()+"','"+this.app._lokasi+"' )");				
										break;
										case "B":
											if (start < 0) start = 6 * Math.ceil(Math.abs(start) / 6)+ 1;
											else start = 1;
											for (var b=start; b <= 12; b+=6)
												sql.add("insert into agg_gaji_tpkk(nik, kode_param, periode, jenis_agg, posted, kode_pp, nilai, no_gaji, kode_lokasi)"+
													" values('"+ line.kode_dokter +"','"+this.colTitle[c]+"','"+this.eTahun.getText()+( b < 10 ? "0":"")+b+"','"+line.jenis.substr(0,1)+"','F','"+this.cb_pp.getText()+"','"+line[this.colTitle[c].toLowerCase()]+"','"+this.ed_nb.getText()+"','"+this.app._lokasi+"' )");				
										break;
										case "C":
											if (start < 0) start = Math.abs(start);
											else start = 1;
											for (var b=start; b <= 12; b++)
												sql.add("insert into agg_gaji_tpkk(nik, kode_param, periode, jenis_agg, posted, kode_pp, nilai, no_gaji, kode_lokasi)"+
													" values('"+ line.kode_dokter +"','"+this.colTitle[c]+"','"+this.eTahun.getText()+( b < 10 ? "0":"")+b+"','"+line.jenis.substr(0,1)+"','F','"+this.cb_pp.getText()+"','"+line[this.colTitle[c].toLowerCase()]+"','"+this.ed_nb.getText()+"','"+this.app._lokasi+"' )");				
										break;
										default :
											sql.add("insert into agg_gaji_tpkk(nik, kode_param, periode, jenis_agg, posted, kode_pp, nilai, no_gaji, kode_lokasi)"+
												" values('"+ line.kode_dokter +"','"+this.colTitle[c]+"','"+this.eTahun.getText()+this.dataParam.get(this.colTitle[c]).jns_periode+"','"+line.jenis.substr(0,1)+"','F','"+this.cb_pp.getText()+"','"+line[this.colTitle[c].toLowerCase()]+"','"+this.ed_nb.getText()+"','"+this.app._lokasi+"' )");				
										break;
									}
								}
							}
						}
						
						sql.add("insert into agg_d (kode_lokasi,kode_pk,kode_drk,kode_rka,kode_akun,kode_pp,periode,bulan,jumlah,volume,nilai,tahun,no_bukti,modul,progress,jenis_agg,keterangan) "+
							"       select a.kode_lokasi,substring(b.kode_rka,1,7) as kode_pk,substring(b.kode_rka,1,9) as kode_drk,b.kode_rka as kode_rka,x.kode_akun,a.kode_pp,a.periode,substring(a.periode,5,2),1,1, sum(a.nilai), '"+this.eTahun.getText()+"','"+this.ed_nb.getText()+"','BTPKK','0','E',b.nama "+
							"from agg_gaji_tpkk a  "+
							"	inner join agg_param x on a.kode_param=x.kode_param and substring(a.periode,1,4)=x.tahun  "+
							"	left join agg_rka b on x.kode_rka=b.kode_rka and x.tahun=b.tahun "+
							"	left join agg_drk c on b.kode_drk=c.kode_drk and b.tahun=c.tahun "+
							"where a.nilai<> 0 and a.periode like '"+this.eTahun.getText()+"%' and a.kode_lokasi='"+this.app._lokasi+"' and no_gaji='"+this.ed_nb.getText()+"' "+
							"group by a.kode_lokasi,c.kode_pk,b.kode_drk,b.kode_rka,x.kode_akun,a.kode_pp,a.periode,b.nama ");				

						if (sql.getLength() > 0) this.dbLib.execArraySQL(sql);					
					break;
				
			}			
		}catch(e){
			system.alert(this, e,"");
		}
	},
	keyPress: function(sender, charCode, buttonState ){
	},
	doEditChange: function(sender){
		if (sender == this.eTahun){
			this.dbLib.getDataProviderA("select kode_band, kode_param, jenis, persen from agg_band_param where tahun = "+sender.getText()+" ");
		}
	},	
	doTampilClick: function(sender){
		try{			
		    sql="select a.kode_dokter, a.nama, case jenis_agg when 'T' then 'TAMBAHAN' when 'E' then 'EKSISTING' when 'P' then 'PREDIKSI' end as jenis, a.status, date_format(a.tgl_operasi,'%d-%m-%Y') as tgl, "+
				"	case when datediff (month, a.tgl_operasi, '"+this.eTahun.getText()+"-12-31')+1 >= 0 then 12 else datediff(month, a.tgl_operasi, '"+this.eTahun.getText()+"-12-31') end as jml, "+
				"	a.kode_band,a.kode_loker,b.nama as nama_loker, ";
			for (var i in this.colTitle) sql += " sum(ifnull(c."+this.colTitle[i].toLowerCase() +",0)) as "+this.colTitle[i].toLowerCase()+",";				
			sql += "sum(";
			for (var i in this.colTitle) {
				if ( i > 0) sql += "+";
				sql += "ifnull(c."+this.colTitle[i].toLowerCase()+",0)";
			}
			sql +=") as jumlah from agg_dokter a "+
				"inner join agg_pp b on a.kode_loker=b.kode_pp and a.kode_lokasi=b.kode_lokasi "+
				"left join (select distinct b.kode_band,";
			for (var i in this.colTitle) {
				if(i > 0) sql +=",";
				sql += " (case a.kode_param when '"+this.colTitle[i].toLowerCase()+"' then round(b.nilai,0) else 0 end) as "+this.colTitle[i].toLowerCase()+" ";
			}
			sql +=	"	from agg_param a "+
				"	inner join agg_norma_fix b on a.kode_param=b.kode_param and b.tahun = a.tahun  "+ 
				"	where a.jenis = 'TPKK' and a.tahun = '"+this.eTahun.getText()+"' "+
				"	 "+
				"	   )c on a.kode_band=c.kode_band "+
				" where a.kode_lokasi = '"+this.app._lokasi+"' "+
				"group by a.kode_dokter, a.nama, a.jenis_agg, a.status, a.tgl_operasi, a.kode_band, a.kode_loker, b.nama ";	
			
			var temp = this.dbLib.getDataProvider(sql,true);
			if (typeof temp != "string") {				
				this.rowPerPage = 20;
				this.dataDokter = temp;
				this.selectPage(1);
				
				this.sgn.setTotalPage(Math.ceil(temp.rs.rows.length/ this.rowPerPage));				
				this.sgn.rearrange();
				this.sgn.activePage = 0;
			}else systemAPI.alert(temp);
			
		}catch(e){
			systemAPI.alert(e);
		}
	},
	doPager: function(sender, page){
		this.selectPage(page);	
	},
	selectPage: function(page){
		this.page = page;
		this.sg1.clear();
		var start = (page - 1) * this.rowPerPage;
		var finish = ( start + this.rowPerPage > this.dataDokter.rs.rows.length ? this.dataDokter.rs.rows.length : start + this.rowPerPage);
		var line, data;
		for (var i=start;i < finish; i++){
			line =  this.dataDokter.rs.rows[i];
			data = [line.kode_dokter, line.nama, line.jenis, line.status, line.kode_band, line.kode_loker, line.nama_loker,line.tgl]
			for (var c in this.colTitle){
				data[data.length] = floatToNilai(line[this.colTitle[c].toLowerCase()]);
			}
			data[data.length] = line["jumlah"];
			this.sg1.appendData(data);
		}		
		this.sg1.setNoUrut(start);
	},
	doClick: function(sender){
		try{
			if (sender == this.bGen){
				this.ed_nb.setText(this.standarLib.noBuktiOtomatis(this.dbLib,"agg_gajitpkk_m","no_gaji",this.app._lokasi+"-TPKK"+this.eTahun.getText().substr(0,2),"000"));
			}
		}catch(e){
			alert(e);
		}
	},
	doRequestReady: function(sender, methodName, result){	
		try{
			if (sender == this.dbLib)
			{
				switch	(methodName)
				{
					case "execArraySQL" :
						if (result.toLowerCase().search("error") == -1)
							this.app._mainForm.pesan(2,"Transaksi Sukses ("+ this.eTahun.getText()+")");
						else this.app._mainForm.pesan(0, result); 
						break;
					case "getDataProvider":
						var data = this.dbLib.getDataProvider("select kode_param, nama, jns_periode  from agg_param where tahun = '"+this.eTahun.getText()+"'  and jenis = 'TPKK' order by no_urut",true);
						if (typeof data != "string"){							
							this.sg1.setColCount(data.rs.rows.length + 9);
							var line,title = [];	
							var hint = ["KODE RUANG","NAMA","JENIS","JOB STATUS","BAND","LOKER","TPK","TGL Beroperasi"];				
							this.sg1.columns.get(6).setColWidth(250);
							this.dataParam = new portalui_arrayMap();
							for (var i in data.rs.rows){
								line = data.rs.rows[i];
								title.push(line.kode_param);					
								hint.push(line.nama.toUpperCase());
								this.sg1.columns.get(parseInt(i)+8).setHint(line.nama);
								this.sg1.columns.get(parseInt(i)+8).setColumnFormat(cfNilai);
								
								if (line.nama.length * 7 < 80)
									this.sg1.columns.get(parseInt(i)+8).setColWidth(80);
								else this.sg1.columns.get(parseInt(i)+8).setColWidth(line.nama.length * 7);
								
								this.dataParam.set(line.kode_param, line);
							}					
							hint.push("TOTAL");							
							//this.sg1.columns.get(6).setColumnFormat(cfNilai);
							this.sg1.columns.get(data.rs.rows.length+8).setColumnFormat(cfNilai);
							this.sg1.setColWidth([1],[200]);
							this.sg1.setColTitle(hint);
							this.colTitle = title;
						}
					break;
				}
			}
		}catch(e){
			alert(e);
		}
	}
	
});
